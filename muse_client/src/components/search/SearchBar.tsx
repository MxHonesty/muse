import { Component, ChangeEvent } from 'react';

export interface SearchBarProps {
    /** Function for obtaining the data.
     *  
     * **Return:** a string representing the
     * response body that can be parsed into json.
     */
    call: (name:string) => Promise<string>;

    /** Function that takes an array of data objects. 
     * Mainly used to display a list view.
     */
    children?: (data: Array<Object>) => JSX.Element;
}

export interface SearchBarState {
    /** Current text in search bar */
    text: string,

    /** An array of objects representing the current data. */
    data: Array<any>,

    /** Timeout for typing. */
    typingTimeout: any,
}

/**
 * Search bar Component for handling call and data logic.
 * Uses the callback call every few seconds after user stopped
 * typing in order to collect and display the data.
 * 
 * **Children**:
 *      Can have a function child that takes an array of any type objects and
 *      returns a component. This can be used in order to display the current
 *      data with the help of a list view.
 * 
 * **Example**: 
 *      In this example we can see a function passed as calls props 
 *      that takes a name and returns a text representing the body
 *      of the response.
 *      As a child, a *display* function is passed that takes as
 *      an argument the data, an array of any type and returns a 
 *      component.
 *      If no children ar provided, then nothing will be displayed.
 *   ```   <SearchBar
 *          call={async (name)=>{
 *          let res = await fetch(`http://127.0.0.1:8000/api/song/?track_name=${name}&nr=5`)
 *          let text = await res.text();
 *          return text;
 *          }}>
 *              {(data: Array<any>) => { return <TrackListView data={data}/> }} 
 *          </SearchBar> 
 * 
 *   ```
 * 

 */
export class SearchBar extends Component<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps) {
        super(props);
        this.state = {
            text: "",
            data: [],
            typingTimeout: 0
        };

        this.onTextChange = this.onTextChange.bind(this);
    }

    /** Called when text search changes. */
    onTextChange(event: ChangeEvent<HTMLInputElement>) {

        // If timer is going, clear it.
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        // Reset the timeout after the text is modified.
        const self = this;  // For callback safety.
        self.setState({
            text: event.target.value,
            typingTimeout: setTimeout(async () => {
                if(self.state.text !== "") {  // If a text is entered.
                    let res_data = await self.props.call(self.state.text);
                    self.setState({data: JSON.parse(res_data)});
                    console.log(self.state.data);  // DEBUG LOG
                }

            }, 1000),
        });
    }

    render() {
        return(
            <div>
                <input type='text' onChange={this.onTextChange} />
                {this.props.children ? this.props.children(this.state.data) : null}
            </div>
        );
    }
}
