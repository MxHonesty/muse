import { Component, ChangeEvent } from 'react';

export interface SearchBarProps {
    /** Function for obtaining the data */
    call: (name:string) => Promise<string>;
}

export interface SearchBarState {
    /** Current text in search bar */
    text: string,

    /** An array of objects representing the current data. */
    data: Array<Object>,

    /** Timeout for typing. */
    typingTimeout: any,
}

/**
 * Search bar Component for handling call and data logic.
 * Uses the callback call every few seconds after user stopped
 * typing in order to collect and display the data.
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
            </div>
        );
    }
}
