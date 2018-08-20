import {render, shallow} from "enzyme";
import * as renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import * as React from "react";
import {NavigationContext} from "./NavigationContext/NavigationContext";
import Link from "./Link";
import NavigationTabRenderer from "./TabRenderer/NavigationTabRenderer";
import NavigationPageRenderer from "./NavigationPageRenderer";
import {PagesInfo} from "./types/PagesInfo";
import PageContextSpy from "./PageContext/PageContextSpy";
import {page} from "./PageContainer/page";

describe('IntegrationTest', function () {
    it('should work with a single home page', function () {
        const pages: PagesInfo = {
            home: {
                title: 'Home Page',
                component: page(() => <div>
                    <PageContextSpy>
                        {(pageContext) => {
                            expect(pageContext).not.toBeNull()
                            console.log('pageContext', pageContext);
                            return null
                        }}
                    </PageContextSpy>
                </div>),
                singleInstance: true
            }
        }
        let App = () => {
            return <NavigationContext pages={pages}>
                <div>
                    {/*Sidebar / external area*/}
                    <Link to={'home'}/>
                    {/*Page context should be null here*/}
                    <PageContextSpy>
                        {(pageContext) => {
                            expect(pageContext).toBeNull()
                            return null
                        }}
                    </PageContextSpy>
                </div>
                <div>
                    {/*Main area*/}
                    <div>
                        {/*Tabs area*/}
                        <NavigationTabRenderer
                            containerComponent={(props) => <div/>}
                            tabComponent={(props) => <div/>}
                            newTabComponent={(props) => <div/>}
                        />
                    </div>
                    <div>
                        {/*Page rendering area*/}
                        <NavigationPageRenderer/>
                    </div>
                </div>
            </NavigationContext>;
        };
        mount(<App/>)
    });
});
