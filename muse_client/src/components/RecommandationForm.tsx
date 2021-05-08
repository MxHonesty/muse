import { Component } from 'react';
import { FormControl, TextField } from '@material-ui/core';

import { Track } from './search/TrackListView';
import { TrackScrollableList } from './search/TrackScrollableList';
import { TrackDisplayForList } from './search/TrackDisplayForList';
import { SearchBar } from './search/SearchBar';

interface FormProps {

}

interface FormState {
    title: string,
    description: string,
    track?: Track | null
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
    }

    /** Called when the current Track selection is Cleared. */
    onClearSelection() {
        this.setState({
            track: null,
        });
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
            call={async (name)=>{
              let res = await fetch(`http://127.0.0.1:8000/api/song/?track_name=${name}&nr=5`);
              let text = await res.text();
              return text;
              }}>
               {(data: Array<any>) => { return <TrackScrollableList data={data} onSelect={ async (trackId) => {
                    // We fetch the Track data.
                    // And store the new data inside the state.
                    let rez = await fetch(`http://127.0.0.1:8000/api/track/?id=${trackId}`);
                    let new_track: Track = await rez.json();
                    console.log(new_track);
                    self.setState({
                        track: new_track
                    });

               }}/> }} 
              </SearchBar>
            )};

        return(
            <FormControl margin={"normal"}>
                <SearchArea/>
                <TextField id="title-input" label="Title" variant="outlined" style={{marginBottom: '.5em', marginTop: '.5em'}}/>
                <TextField id='desc-input' label='Description' variant="outlined" multiline style={{marginBottom: '.5em'}}/>
            </FormControl>
        );
    }
}
