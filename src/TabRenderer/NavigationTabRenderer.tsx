import React, {Component, ComponentType} from 'react';
import _ from "lodash";
import NavigationSpy from "../NavigationContext/NavigationSpy";

export interface TabComponentProps {
    title: string
    icon?: string
    active: boolean
    closeable: boolean
    size: number
    onClose?: () => void
    onCloseClick?: () => void
    onClick: () => void
    onNewTabClick: () => void
    onDuplicateTabClick: () => void
}
export interface NewTabProps {
    onClick: () => void
}
export interface NavigationTabRendererProps {
    containerComponent: ComponentType<{onWheel: Function}>, //Has to attach onWheel event
    tabComponent: ComponentType<TabComponentProps>
    newTabComponent: ComponentType<NewTabProps>
}

/**
 * Renders tabs that control the current NavigationContext. Fully customizable.
 */
class NavigationTabRenderer extends Component<NavigationTabRendererProps> {
    // static defaultProps: Partial<NavigationTabRendererProps> = {
    //     containerComponent: DefaultContainer,
    //     newTabComponent: NewTab,
    //     tabComponent: TabComponent
    // }
    handleContainerWheel = ({stacks, selectedStackIndex, selectStack}) => (e: MouseWheelEvent) => {
        // console.log(`Wheel ${e.deltaX} ${e.deltaY} ${e.deltaZ}, ${e.deltaMode}, ${e.wheelDeltaX} ${e.wheelDeltaY}`, e);
        e.stopPropagation();
        const transform = (delta) => {
            if(delta == 0) return 0;
            return delta > 0 ? 1 : -1
        }
        const newIndex = selectedStackIndex + transform(e.deltaY)
        if(newIndex === selectedStackIndex) return;
        let newStack = stacks[newIndex];
        if(newStack == null) return;
        selectStack(newStack.id)
    }
    render() {
        const Container = this.props.containerComponent
        const NewTabComponent = this.props.newTabComponent
        const TabComponent = this.props.tabComponent
        return <NavigationSpy>
            {({stacks, selectedStackId, selectedStackIndex, navigate, selectStack, closeTab, titles, duplicateStack}) => {
                let navigateToNewTab = () => navigate({to: 'home', inNewTab: true, focusNewTab: true});
                const tabElements = stacks.map((stack, index) => {
                    const top = _.last(stack.frames)

                    return <TabComponent
                        key={index}
                        title={titles[index] || `Page: ${top.pageName}`}
                        active={selectedStackId === stack.id}
                        closeable={true}
                        size={stack.frames.length}
                        onClick={() => selectStack(stack.id)}
                        onCloseClick={() => closeTab(stack.id)}
                        onNewTabClick={navigateToNewTab}
                        onDuplicateTabClick={() => duplicateStack(stack.id)}
                    />
                })
                return <Container onWheel={this.handleContainerWheel({stacks, selectedStackIndex, selectStack})}>
                    {tabElements}
                    <NewTabComponent key={-1} onClick={navigateToNewTab}/>
                </Container>
            }}
        </NavigationSpy>
    }
}

export default NavigationTabRenderer;
