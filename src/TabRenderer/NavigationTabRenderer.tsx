import React, {Component, ComponentType} from 'react';
import _ from "lodash";
import NavigationSpy from "../NavigationContext/NavigationSpy";

export interface TabComponentProps {
    title: string
    icon?: string
    active: boolean
    closeable: boolean
    size: number
    onClose?: () => void
    onCloseClick?: () => void
    onClick: () => void
}
export interface NewTabProps {
    onClick: () => void
}
export interface NavigationTabRendererProps {
    containerComponent: ComponentType,
    tabComponent: ComponentType<TabComponentProps>
    newTabComponent: ComponentType<NewTabProps>
}

class NavigationTabRenderer extends Component<NavigationTabRendererProps> {
    // static defaultProps: Partial<NavigationTabRendererProps> = {
    //     containerComponent: DefaultContainer,
    //     newTabComponent: NewTab,
    //     tabComponent: TabComponent
    // }
    render() {
        const Container = this.props.containerComponent
        const NewTabComponent = this.props.newTabComponent
        const TabComponent = this.props.tabComponent
        return <NavigationSpy>
            {({stacks, selectedStackId, navigate, selectStack, closeTab, titles}) => {
                const tabElements = stacks.map((stack, index) => {
                    const top = _.last(stack.frames)

                    return <TabComponent
                        key={index}
                        title={titles[index] || `Page: ${top.pageName}`}
                        active={selectedStackId === stack.id}
                        closeable={true}
                        size={stack.frames.length}
                        onClick={() => selectStack(stack.id)}
                        onCloseClick={() => closeTab(stack.id)}
                    />
                })
                return <Container>
                    {tabElements}
                    <NewTabComponent key={-1} onClick={() => navigate({to: 'home', inNewTab: true, focusNewTab: true})}/>
                </Container>
            }}
        </NavigationSpy>
    }
}

export default NavigationTabRenderer;
