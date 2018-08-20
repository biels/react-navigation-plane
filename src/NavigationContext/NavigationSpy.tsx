import React, {Component, ReactNode} from 'react';
import _ from "lodash";
import PageContextSpy from "../PageContext/PageContextSpy";
import {NavigationConsumer, ProvidedNavigationContext} from "./NavigationContext";


export interface NavigationSpyProps {
    children: (context: ProvidedNavigationContext) => ReactNode
}

// Can be used inside and outside a page
// Attaches source page when possible
class NavigationSpy extends Component<NavigationSpyProps> {
    render() {
        return <PageContextSpy>
            {(pageContext) => {
                return <NavigationConsumer>
                    {(context: ProvidedNavigationContext) => {
                        return this.props.children({
                            ...context,
                            navigate: context.navigateFromPage({from: (pageContext || {} as any).location || null})
                        })
                    }}
                </NavigationConsumer>
            }}
        </PageContextSpy>
    }
}

export default NavigationSpy;
