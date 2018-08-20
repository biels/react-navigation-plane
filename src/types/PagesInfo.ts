import {ComponentType} from "react";

export interface PagesInfo {
    [pageName: string]: {
        component: ComponentType,
        title?: string,
        singleInstance?: boolean
    }
}
