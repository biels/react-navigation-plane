import React, {Component} from 'react';
import _ from "lodash";
import {PageContextConsumer, ProvidedPageContext} from "./PageContext";


export interface PageContextSpyProps {
    children: (context: ProvidedPageContext) => any
}

/**
 * Accesses the PageContext. Can be used outside a provider, to allow for out of page buttons such as in a Sidebar.
 */
class PageContextSpy extends Component<PageContextSpyProps> {
    render() {
        return <PageContextConsumer>
            {(context) => {
                // Allow out of context usage
                // if(context == null){
                //     console.log('Use PageContextSpy inside a PageContext');
                //     return null;
                // }
                return this.props.children(context)
            }}
        </PageContextConsumer>
    }
}

export default PageContextSpy;
