import React, {Component, ReactNode} from 'react';
import _ from "lodash";
import PageContextSpy from "../PageContext/PageContextSpy";
import NavigationSpy from "../NavigationContext/NavigationSpy";


export interface InstanceTitleProps {
    title: ReactNode
}
let options: MutationObserverInit = {
    childList: true,
    characterData: true,
    subtree: true
};
class InstanceTitle extends Component<InstanceTitleProps> {
    divRef: React.RefObject<HTMLDivElement> = React.createRef();
    setPageTitle = null
    mutationObserver = null
    componentDidUpdate(){
        // this.setPageTitle(this.divRef.current.textContent.toString())
        this.mutationObserver.observe(this.divRef.current, options)
    }
    componentDidMount() {
        //attach mutation observer
        const onMutate = (mutations: MutationRecord[]) => {
            let htmlDivElement = this.divRef.current;
            if(htmlDivElement == null) return
            // console.log('mutations', mutations, mutations[0]);
            this.setPageTitle(htmlDivElement.textContent)
        }
        setTimeout(() => {
            let htmlDivElement = this.divRef.current;
            if(htmlDivElement == null) return

            this.setPageTitle(htmlDivElement.textContent)
        })
        this.mutationObserver = new MutationObserver(onMutate)
        this.mutationObserver.observe(this.divRef.current, options)
    }
    componentWillUnmount(){
        if(this.mutationObserver != null)
            this.mutationObserver.disconnect()
    }
    render() {
        return <PageContextSpy>
            {({location}) => {
                return <NavigationSpy>
                    {({setPageTitle}) => {
                        this.setPageTitle = (title) => setPageTitle(location, title)
                        // setPageTitle(location, this.props.title)
                        let debugStyle = {display: 'block', position: 'absolute', float: 'left', background: 'gold', color: 'black', padding: 4};
                        return <div ref={this.divRef} style={{display: 'none'}}>
                            {this.props.title}
                        </div>
                    }}
                </NavigationSpy>
            }}
        </PageContextSpy>
    }
}

export default InstanceTitle;
