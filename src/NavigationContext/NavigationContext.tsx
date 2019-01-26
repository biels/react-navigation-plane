import React, {Component, ComponentType, ReactNode} from 'react';
import _ from "lodash";
import {PagesInfo} from "../types/PagesInfo";
import {PageArgs} from "../types/PageArgs";

interface RegisteredPages {
    home: ComponentType

    [pageName: string]: ComponentType
}

export type PageName = keyof RegisteredPages

interface NavigationProps {
    pages: PagesInfo
    homeFrame?: StackFrame
}

export interface StackFrame {
    pageName: PageName,
    title?: string,
    args: Object
}

export interface StackFrameLocation {
    stackId: number
    frameIndex: number
}

export interface NavigationStack {
    id: number
    openerLocation: StackFrameLocation | null
    frames: StackFrame[]
}

interface NavigationState {
    stacks: NavigationStack[],
    selectedStackId: number,
    nextStackId: number
}

export interface NavigateParams {
    to: PageName,
    args?: PageArgs,
    inNewTab?: boolean,
    focusNewTab?: boolean,
    replace?: boolean

}

export interface NavigatePageContextParams {
    from: StackFrameLocation | null
}

export interface ProvidedNavigationContext {
    stack: NavigationStack
    stacks: NavigationStack[]
    selectedStackId: number
    selectedStackIndex: number
    top: StackFrame
    back: (n?: number) => void
    navigate: (params: NavigateParams) => void
    navigateFromPage: (pageParams: NavigatePageContextParams) => (params: NavigateParams) => void
    selectStack: (index: number) => void
    setPageTitle: (location: StackFrameLocation, title: ReactNode) => void
    getStack: (stackId?: number) => NavigationStack
    getFrame: (location: StackFrameLocation) => StackFrame
    closeTab: (index: number) => void
    pages: PagesInfo
    duplicateStack: (stackId: number, openerLocation?: StackFrameLocation | null, focus?: boolean) => void
    titles: string[]
}

const {Provider: RawProvider, Consumer: NavigationConsumer} = React.createContext<ProvidedNavigationContext>(null as any);

let homeFrame = {pageName: 'home', title: 'Inici', args: {}};

/**
 * Holds the navigation state
 */
class NavigationContext extends Component<NavigationProps, NavigationState> {
    homeFrame = this.props.homeFrame || homeFrame
    state: NavigationState = {
        stacks: [
            {id: 0, openerLocation: null, frames: [this.homeFrame]}
        ],
        selectedStackId: 0,
        nextStackId: 1,
    }
    getStackIndex = (stackId: number) => {
        return _.findIndex(this.state.stacks, (s: NavigationStack) => s.id === stackId);
    }
    getSelectedStackIndex = () => {
        return this.getStackIndex(this.state.selectedStackId)
    }
    getStack = (stackId?: number): NavigationStack => {
        if (stackId == null) stackId = this.state.selectedStackId;
        return _.find(this.state.stacks, (s: NavigationStack) => s.id === stackId);
    }
    getFrame = (location: StackFrameLocation) => {
        return this.getStack(location.stackId).frames[location.frameIndex]
    }
    setStackFrames = (stackId, newStackFrames: StackFrame[]) => {
        if (stackId == null) return;
        let newStacks = this.state.stacks
        let stackIndex = _.findIndex(this.state.stacks, (s: NavigationStack) => s.id === stackId)
        const newStack = {...this.state.stacks[stackIndex], frames: newStackFrames}
        _.set(newStacks, stackIndex, newStack)
        this.setState({
            stacks: newStacks
        })
    }
    selectStack = (id) => {
        this.setState({selectedStackId: id})
    }
    push = (stackId, frame: StackFrame) => {
        let stack = this.getStack(stackId);
        const newStackFrames = _.concat(stack.frames, frame)
        this.setStackFrames(stackId, newStackFrames)
    }
    pop = (stackId: number, n: number) => {
        let stack = this.getStack(stackId);
        const newStackFrames = _.dropRight(stack.frames, Math.min(n, stack.frames.length - 1))
        this.setStackFrames(stackId, newStackFrames)
    }
    replace = (stackId, frame: StackFrame) => {
        this.pop(stackId, 1);
        this.push(stackId, frame);
    }
    newTab = (initialFrame: StackFrame, openerLocation: StackFrameLocation | null, focus = false) => {
        let newId = this.state.nextStackId;
        let newStack: NavigationStack = {frames: [initialFrame], id: newId, openerLocation}
        let newStacks = [...this.state.stacks, newStack];
        this.setState({
            stacks: newStacks,
            selectedStackId: focus ? newId : this.state.selectedStackId,
            nextStackId: newId + 1
        })
    }
    closeTab = (id: number) => {
        if (this.state.stacks.length <= 1) {
            // Only one stack left
            this.setStackFrames(id, [this.homeFrame])
            return;
        }
        let stackIndex = this.getStackIndex(id);
        let newStacks = this.state.stacks
        newStacks.splice(stackIndex, 1)
        // let selectedStackId = this.state.selectedStackId;
        let newSelectedStackIndex = this.getSelectedStackIndex();
        // if (stackIndex < selectedStackIndex) newSelectedStackIndex--;
        newSelectedStackIndex = _.clamp(newSelectedStackIndex, 0, this.state.stacks.length - 1)
        let newSelectedStackId = this.state.stacks[newSelectedStackIndex].id
        this.setState({
            stacks: newStacks,
            selectedStackId: newSelectedStackId
        })
    }
    setPageTitle = ({stackId, frameIndex}: StackFrameLocation, title: string) => {
        let stack = this.getStack(stackId);
        if (stack == null) return;
        let newStackFrames = stack.frames;
        let frame = newStackFrames[frameIndex];
        if (frame == null) return;
        const oldTitle = frame.title;
        if (oldTitle === title) return;
        newStackFrames[frameIndex].title = title;
        this.setStackFrames(stackId, newStackFrames)
        // console.log(`Set page title of stack ${stackId} to ${title}`);
    }
    handleBack = (number = 1) => {
        if (this.getStack().frames.length <= 1) return;
        this.pop(this.state.selectedStackId, number)
    }
    handleNavigate = ({from}: NavigatePageContextParams) => ({to, args, inNewTab, focusNewTab, replace}: NavigateParams) => {
        if (this.props.pages[to] == null) return;
        let frame: StackFrame = {pageName: to, args: args, title: ''};
        if (replace) {
            if (this.getStack().frames.length <= 1) return;
            this.replace(this.state.selectedStackId, frame)
            return;
        }
        if (inNewTab) {
            this.newTab(frame, from, focusNewTab)
            return
        }
        this.push(this.state.selectedStackId, frame)
    }
    // filterFrame = (frame: StackFrame) => {
    //     return _.omit(frame, ['title'])
    // }
    // filterStack = (stack: NavigationStack) => {
    //     return {...stack, frames: stack.frames.map(this.filterFrame)}
    // }
    // filterState = () => {
    //     return {...this.state, stacks: this.state.stacks.map(this.filterStack)}
    // }
    getTitles = () => {
        return this.state.stacks.map(s => _.last(s.frames)).map(f => f.title)
    }

    // Advanced functionalities
    duplicateStack = (stackId, openerLocation: StackFrameLocation | null = null, focus = true) => {
        let originStack = this.getStack(stackId);
        let newId = this.state.nextStackId;
        let clonedStack: NavigationStack = {frames: _.cloneDeep(originStack.frames), id: newId, openerLocation: originStack.openerLocation || openerLocation}
        let newStacks = [...this.state.stacks]
        newStacks.splice(this.getStackIndex(stackId) + 1, 0, clonedStack);
        this.setState({
            stacks: newStacks,
            selectedStackId: focus ? newId : this.state.selectedStackId,
            nextStackId: newId + 1
        })
    }

    render() {
        return <RawProvider value={{
            titles: this.getTitles(),
            pages: this.props.pages,
            navigate: this.handleNavigate({from: null}),
            navigateFromPage: this.handleNavigate,
            stacks: this.state.stacks,
            stack: this.getStack(),
            selectedStackId: this.state.selectedStackId,
            selectedStackIndex: this.getSelectedStackIndex(),
            back: this.handleBack,
            top: _.last((this.getStack() || {} as any).frames) as StackFrame,
            selectStack: this.selectStack,
            closeTab: this.closeTab,
            setPageTitle: this.setPageTitle,
            getStack: this.getStack,
            getFrame: this.getFrame,
            duplicateStack: this.duplicateStack
        }}>
            {this.props.children}
        </RawProvider>
    }
}

export {NavigationContext, NavigationConsumer};
