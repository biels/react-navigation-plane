import * as React from "react";
import PageContainer, {PageContainerProps} from "./PageContainer";
import {SFC} from "react";
import {ProvidedPageContext} from "../PageContext/PageContext";
import {StackFrameLocation} from "../NavigationContext/NavigationContext";
import * as _ from "lodash";


export const page = (component) => class extends React.Component<{location: StackFrameLocation, args: Object}, any> {
    componentDidMount(){
        // console.log(`Page ${component.displayName} mounted with args`, this.props.args);
    }
    componentWillUnmount(){
        // console.log(`Page ${component.displayName} unmounted`);
    }
    shouldComponentUpdate(nextProps, nextState){
        //FIXME Possibly reverse check. Not that page args change frequently though.
        if(_.isEqual(this.props.args, nextProps.args)) return true
        return false
    }
    render() {
        return <PageContainer {...this.props} component={component}/>
    }
}


// Still useful?
export interface PageProps {
    // form: FormApi
    args: Object
    context: {
        page: ProvidedPageContext
    }
}
