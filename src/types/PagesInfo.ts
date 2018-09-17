import {ComponentType} from "react";

/**
 * Type for object that contains the registered pages in the system.
 */
export interface PagesInfo {
    [pageName: string]: {
        component: ComponentType,
        title?: string,
        singleInstance?: boolean
    }
}
