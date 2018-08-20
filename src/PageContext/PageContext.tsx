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

}
export interface ProvidedPageContext {
    args: PageArgs
    location: StackFrameLocation
    navigate: ProvidedNavigationContext['navigate']
    stack: NavigationStack,
    frame: StackFrame
}
const {Provider: RawProvider, Consumer: PageContextConsumer} = React.createContext<ProvidedPageContext>(null as any);
class PageContext extends Component<PageContextProps, PageContextState> {
    render() {
        return <NavigationSpy>
            {(navigation: ProvidedNavigationContext) => {
                const navigate = () => navigation.navigateFromPage({from: this.props.location})
                return <RawProvider value={{
                    args: this.props.args || {},
                    location: this.props.location,
                    navigate,
                    stack: navigation.getStack(this.props.location.stackId),
                    frame: navigation.getFrame(this.props.location),
                }}>
                    {this.props.children}
                </RawProvider>
            }}
        </NavigationSpy>
    }
}

export {PageContext, PageContextConsumer};
