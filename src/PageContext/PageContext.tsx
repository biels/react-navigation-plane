import React, {Component} from 'react';
import _ from "lodash";
import {
    NavigationStack,
    ProvidedNavigationContext,
    StackFrame,
    StackFrameLocation
} from "../NavigationContext/NavigationContext";
import NavigationSpy from "../NavigationContext/NavigationSpy";
import {PageArgs} from "../types/PageArgs";

export interface PageContextProps {
    args: PageArgs,
    location: StackFrameLocation
}
export interface PageContextState {
    route: string[]
}
export interface ProvidedPageContext {
    state: PageContextState
    args: PageArgs
    location: StackFrameLocation
    navigate: ProvidedNavigationContext['navigate']
    stack: NavigationStack,
    frame: StackFrame
    setPageState: (newState: PageContextState) => void
}
const {Provider: RawProvider, Consumer: PageContextConsumer} = React.createContext<ProvidedPageContext>(null as any);

/**
 * Provides args, location, navigate with source and processed navigation information to the page.
 */
class PageContext extends Component<PageContextProps, PageContextState> {

    state = {
        route: _.get(this.props, 'args.route') || []
    }

    handleSetPageState = (newState: PageContextState) => {
        this.setState(newState)
    }
    render() {
        return <NavigationSpy>
            {(navigation: ProvidedNavigationContext) => {
                const navigate = () => navigation.navigateFromPage({from: this.props.location})
                return <RawProvider value={{
                    state: this.state,
                    args: this.props.args || {},
                    location: this.props.location,
                    navigate,
                    stack: navigation.getStack(this.props.location.stackId),
                    frame: navigation.getFrame(this.props.location),
                    setPageState: this.handleSetPageState
                }}>
                    {this.props.children}
                </RawProvider>
            }}
        </NavigationSpy>
    }
}

export {PageContext, PageContextConsumer};
