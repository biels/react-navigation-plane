import {render, shallow} from "enzyme";
import * as renderer from 'react-test-renderer';
import * as React from "react";
import {NavigationContext} from "./NavigationContext/NavigationContext";
import Link from "./Link";
import NavigationTabRenderer from "./TabRenderer/NavigationTabRenderer";
import NavigationPageRenderer from "./NavigationPageRenderer";
import {PagesInfo} from "./types/PagesInfo";

describe('CompleteUseCase1', function () {
    it('should work', function () {
        const pages: PagesInfo = {
            page1: {
                title: 'Page1',
                component: () => <div/>,
                singleInstance: true
            }
        }
        let App = () => <NavigationContext pages={pages}>
            <div>
                {/*Sidebar / external area*/}
                <Link to={'page1'}/>
            </div>
            <div>
                {/*Main area*/}
                <div>
                    {/*Tabs area*/}
                    <NavigationTabRenderer
                        containerComponent={() => <div/>}
                        tabComponent={() => <div/>}
                        newTabComponent={() => <div/>}
                    />
                </div>
                <div>
                    {/*Page rendering area*/}
                    <NavigationPageRenderer/>
                </div>
            </div>
        </NavigationContext>;
        renderer.create(App)
    });
});
