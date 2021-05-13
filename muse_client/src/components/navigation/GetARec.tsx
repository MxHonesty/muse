import React, { Component, Fragment } from 'react';
import { get_random_recommendation, get_track, Recommendation } from '../../service/APIService';
import { TrackDisplayForList } from '../search/TrackDisplayForList';
import { Track } from '../search/TrackListView';
import { Button } from '@material-ui/core';


/** State of the Submenu
 * It can have a Recommendation and a current_track that is 
 * derived from the recommendation data on mount.
 * They are null when unitialized.
 */
export interface GetARecState {
    current_track: Track | null,
    recommendation: Recommendation | null,
}

/** Submenu component for the Get a Recommandation Section. */
export class GetARec extends Component<{}, GetARecState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            current_track: null,
            recommendation: null,
        };

        this.fetchData = this.fetchData.bind(this);
        this.recommendationDisplay = this.recommendationDisplay.bind(this);
        this.getDate = this.getDate.bind(this);
        this.getDayDifference = this.getDayDifference.bind(this);
    }

    /** Fetches the Recommandation and Track data. */
    async fetchData() {
        let recommendation = await get_random_recommendation();
        let track: Track = await get_track(recommendation.trackId);
        this.setState({
            current_track: track,
            recommendation: recommendation,
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    /** Converts the current updated string to Date number 
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    */
    getDate() {
        if(this.state.recommendation instanceof Object) {
            const string_date = this.state.recommendation.updated;
            let date = Date.parse(string_date);
            return date;
        }
        return 0;
    }

    /** Returns the day differance between today and the Update date of the recommendation */
    getDayDifference() {
        const update_date = this.getDate();
        const today = Date.now();
        const diff = today - update_date;

        return (diff / 1000 / 60 / 60 / 24 );  // Number of Days since the Recommendation was made.
    }

    /** Creates the Display for a given Track and Recommendation */
    recommendationDisplay(track: Track, rec: Recommendation) {
        const days = Math.floor(this.getDayDifference());
        return(
            <Fragment>
                <TrackDisplayForList name={track.name} image_url={track.image_url} artist={track.artist}/>
                <h5>{rec.title}</h5>
                <p style={{fontSize: '70%'}}>{rec.description}</p>
                <p style={{fontSize: '60%', marginTop:'3em'}}> This recommendation was made {days >= 1 ? ( days===1 ? `${days} day ago` : `${days} days ago`) : 'Today'} </p>
            </Fragment>
        )
    }

    render() {
        const track = this.state.current_track;
        const recommendation = this.state.recommendation;
        return(
            <div>
                { track instanceof Object && recommendation instanceof Object ? this.recommendationDisplay(track, recommendation) : <div></div> }
                <Button color='primary' style={{marginTop: '1em'}} onClick={this.fetchData}>Another</Button>
            </div>
        );
    }
}
