import { Component, ChangeEvent } from 'react';

export interface SearchBarProps {
    /** Function for obtaining the data */
    call: (name:string) => Promise<string>;
}

export interface SearchBarState {
    /** Current text in search bar */
    text: string,

    /** Data for tracks */
    data: string,

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
            data: "",
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
                let res_data = await self.props.call(self.state.text);
                self.setState({data: res_data});
            }, 2000),
        });
        
        
    }

    render() {
        return(
            <div>
                <input type='text' onChange={this.onTextChange} />
                <p> {this.state.data} </p>
            </div>
        );
    }
}
