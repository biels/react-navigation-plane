import React, {Component, ComponentType} from 'react';
import styled from "styled-components";
import _ from "lodash";
import {PageProps} from "./page";
import {PageContext} from "../PageContext/PageContext";
import {NavigationConsumer, StackFrameLocation} from "../NavigationContext/NavigationContext";


export interface PageContainerProps {
    component: ComponentType<PageProps>
    location: StackFrameLocation
}

/**
 * Wrapper that is applied when using the page(Page) helper function
 */
class PageContainer extends Component<PageContainerProps> {
    handleSubmit = () => {

    }
    render() {
       return <NavigationConsumer>
           {({top, getFrame}) => { // Possible bug with top being always the displayed top
               const Component = this.props.component
               let frame = getFrame(this.props.location);
               return <PageContext args={(frame || {} as any).args} location={this.props.location}>
                   <Component args={(frame || {} as any).args} context={{page: null}}/>
               </PageContext>
           }}
       </NavigationConsumer>
    }
}

export default PageContainer;
