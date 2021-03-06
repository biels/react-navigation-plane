import {NavigationContext, ProvidedNavigationContext, NavigateParams, NavigationConsumer} from "./NavigationContext/NavigationContext";
import {page} from "./PageContainer/page";
import PageContainer from "./PageContainer/PageContainer";
import {PageContext, ProvidedPageContext} from "./PageContext/PageContext";
import PageContextSpy from "./PageContext/PageContextSpy";
import NavigationTabRenderer from "./TabRenderer/NavigationTabRenderer";
import InstanceTitle from "./utils/InstanceTitle";
import NavigationSpy from "./NavigationContext/NavigationSpy";
import {PageArgs} from "./types/PageArgs";
import {PagesInfo} from "./types/PagesInfo";
import Link from "./Link";
import NavigationPageRenderer from "./NavigationPageRenderer";

// // NavigationContext
// export {default as NavigationSpy} from "./NavigationContext/NavigationSpy"
// export {NavigationContext, ProvidedNavigationContext, NavigateParams} from "./NavigationContext/NavigationContext"
//
// // PageContainer
// export {default as PageContainer} from "./PageContainer/PageContainer";
//
// // PageContext
// export {PageContext} from "./PageContext/PageContext";
// export {default as PageContextSpy} from "./PageContext/PageContextSpy";
//
// // TabRenderer
// export {default as NavigationTabRenderer} from "./TabRenderer/NavigationTabRenderer";
//
// //Types
// export {PageArgs} from './types/PageArgs'
// export {PagesInfo} from './types/PagesInfo'
//
// //Utils
// export {default as InstanceTitle} from "./utils/InstanceTitle";

export {
    page,
    NavigationContext,
    ProvidedNavigationContext,
    NavigationSpy,
    PageContext,
    ProvidedPageContext,
    PageContextSpy,
    NavigationTabRenderer,
    PageArgs,
    PagesInfo,
    NavigationPageRenderer,
    Link,
    NavigationConsumer,
    InstanceTitle,
}

