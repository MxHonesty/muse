import { Component, ChangeEvent } from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';

import { Track } from './search/TrackListView';
import { TrackScrollableList } from './search/TrackScrollableList';
import { TrackDisplayForList } from './search/TrackDisplayForList';
import { SearchBar } from './search/SearchBar';
import { get_track, get_first_5_as_string } from '../service/APIService';


/** The type of the data passed as argument for the API call. */
export interface FormCallType {
    title: string,
    description: string,
    trackId: string,
}

interface FormProps {
    /** Callback that Takes the data object as input.
     * Used for making API Calls.
     */
    call: (data: FormCallType) => void,
}

interface FormState {
    title: string,
    description: string,
    track?: Track | null,
}

/** Recommandation Form for sending a recommandation */
export class RecommandationForm extends Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            title: "",
            description: "",
        };

        this.onClearSelection = this.onClearSelection.bind(this);
        this.isSubmitDisabled = this.isSubmitDisabled.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /** Method determines if the submit button should be disabled.
     * Returns true if the button should be disabled.
     * Returns false if the button should be enabled.
     */
    isSubmitDisabled() {
        if (this.state.title === "")
            return true;
        
        if (this.state.description === '')
            return true;

        if (this.state.track === null || this.state.track === undefined)
            return true;

        return false;
    }

    /** Called when the current Track selection is Cleared. */
    onClearSelection() {
        this.setState({
            track: null,
        });
    }

    onTitleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            title: event.target.value,
        });
    }

    onDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            description: event.target.value,
        });
    }

    /** Handles the submission of the data. */
    onSubmit() {
        if(this.state.track instanceof Object) {
            this.props.call({title: this.state.title, 
                description: this.state.description,
                trackId: this.state.track.track_id
            });
        }
    }

    render() {
        /** We use this function for conditional rendering.
         * The Search Bar is displayed if no track has been selected.
         * If a track is stored inside the state, we then display
         * that track.
         */
        const SearchArea = () => {
            let self = this;

            return (
            this.state.track ? <div onClick={this.onClearSelection}><TrackDisplayForList 
            name={this.state.track.name} artist={this.state.track.artist} image_url={this.state.track.image_url} /> 
            </div>: 
            
            <SearchBar
            call={get_first_5_as_string}>
               {(data: Array<any>) => { return <TrackScrollableList data={data} onSelect={ async (trackId) => {
                    // We fetch the Track data.
                    // And store the new data inside the state.
                    let new_track: Track = await get_track(trackId);
                    console.log(new_track);
                    self.setState({
                        track: new_track
                    });

               }}/> }} 
              </SearchBar>
            )};

        const is_button_disabled = this.isSubmitDisabled();

        return(
            <FormControl margin={"normal"}>
                <SearchArea/>
                <TextField id="title-input" label="Title" variant="outlined" style={{marginBottom: '.5em', marginTop: '.5em'}} onChange={this.onTitleChange} required/>
                <TextField id='desc-input' label='Description' variant="outlined" multiline style={{marginBottom: '.5em'}} onChange={this.onDescriptionChange} required/>
                <Button color='primary' disabled={is_button_disabled} onClick={this.onSubmit}>Submit</Button>
            </FormControl>
        );
    }
}
