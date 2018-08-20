import * as React from "react";
import PageContainer, {PageContainerProps} from "./PageContainer";
import {SFC} from "react";
import {ProvidedPageContext} from "../PageContext/PageContext";


export const page = (component): SFC<PageContainerProps> => (props) => {
    return <PageContainer {...props} component={component}/>
}


// Still useful?
export interface PageProps {
    // form: FormApi
    args: Object
    context: {
        page: ProvidedPageContext
    }
}
