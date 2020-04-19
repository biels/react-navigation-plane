import React, {Component, ComponentType} from 'react';
import NavigationSpy from "./NavigationContext/NavigationSpy";
import {StackFrameLocation} from "./NavigationContext/NavigationContext";
import {Switch} from 'react-stateful-switch';

export interface NavigationPageRendererProps {
    maxHiddenFrames?: number
    maxHiddenStacks?: number
}

/**
 * Renders the
 */
class NavigationPageRenderer extends Component<NavigationPageRendererProps> {
    render() {
        return <NavigationSpy>
            {({pages, selectedStackId, selectedStackIndex, stacks}) => {
                if (pages == null) return null;
                const renderedStacks = stacks.map((stack, stackIndex) => {
                    const renderedFrames = stack.frames.map((frame, frameIndex) => {
                        const DisplayPageComponent: ComponentType<any> = pages[frame.pageName]?.component;
                        if (DisplayPageComponent == null) return null;
                        const location: StackFrameLocation = { // Get specific one when rendering all the tabs at the same time
                            stackId: stack.id,
                            frameIndex
                        }
                        return <DisplayPageComponent args={frame.args} location={location}/>
                    })
                    // console.log(`Frames for ${stack.id}`, stack.frames, 'Selected: ' + (stack.frames.length - 1));
                    return <Switch key={stack.id} views={renderedFrames} selected={stack.frames.length - 1} maxHidden={this.props.maxHiddenFrames}/>
                })
                return <Switch views={renderedStacks} selected={selectedStackIndex || 0} maxHidden={this.props.maxHiddenStacks}/>
            }}
        </NavigationSpy>
    }
}

export default NavigationPageRenderer;
