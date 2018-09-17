import React, {Component} from 'react';
import _ from "lodash";
import {PageName} from "./NavigationContext/NavigationContext";
import NavigationSpy from "./NavigationContext/NavigationSpy";
import {PageArgs} from "./types/PageArgs";

export interface LinkProps {
    to: PageName
    args?: PageArgs,
    inNewTab?: boolean,
    focusNewTab?: boolean,
    replace?: boolean
}

/**
 * Link component to use within the navigation plane
 */
class Link extends Component<LinkProps> {
    render() {
        return <NavigationSpy>
            {({navigate}) => {
                return <div onClick={() => navigate(this.props)}>
                    {this.props.children}
                </div>
            }}
        </NavigationSpy>
    }
}

export default Link;
