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
    track?: Track
}

/** Recommandation Form for sending a recommandation */
export class RecommandationForm extends Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            title: "",
            description: "",
        };
    }

    render() {
        const SearchArea = () => {return (
            this.state.track ? <TrackDisplayForList name={""} artist={""} image_url={""} /> : 
            
            <SearchBar
            call={async (name)=>{
              let res = await fetch(`http://127.0.0.1:8000/api/song/?track_name=${name}&nr=10`);
              let text = await res.text();
              return text;
              }}>
               {(data: Array<any>) => { return <TrackScrollableList data={data} onSelect={(trackId) => {console.log(trackId);}}/> }} 
              </SearchBar>
            )};

        return(
            <FormControl>
                <SearchArea />
                <TextField id="outlined-basic" label="Title" variant="outlined" />
                <TextField id='outlined-basic' label='Description' variant="outlined" multiline/>
            </FormControl>
        );
    }
}
