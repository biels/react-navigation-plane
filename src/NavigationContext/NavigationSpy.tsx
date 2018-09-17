import React, {Component, ReactNode} from 'react';
import _ from "lodash";
import PageContextSpy from "../PageContext/PageContextSpy";
import {NavigationConsumer, ProvidedNavigationContext} from "./NavigationContext";
import {ProvidedPageContext} from "../PageContext/PageContext";


export interface NavigationSpyProps {
    children: (context: ProvidedNavigationContext) => ReactNode
}


/**
 * Reads the NavigationContext. Can be used inside and outside a page.
 * Attaches source page to navigate action when possible.
 */
class NavigationSpy extends Component<NavigationSpyProps> {
    render() {
        return <PageContextSpy>
            {(pageContext: ProvidedPageContext | null) => {
                // Can be used inside and outside a page
                return <NavigationConsumer>
                    {(context: ProvidedNavigationContext) => {
                        if(context == null){
                            console.error('NavigationSpy used outside of a NavigationContext')
                            return null;
                        }
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
