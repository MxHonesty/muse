import { TrackDisplay } from './TrackDisplay';
import React from 'react';

/** Interface for a Track */
export interface Track extends Object {
    artist: string,
    image_url: string,
    name: string,
    track_id: string,
}

/** Props type for TrackList */
export interface TrackListProps {
    
    /** Array of data to display. */
    data?: Array<Track>,

    /** Event called when an item is selected */
    onSelect: (track_id: string) => void,
}

export const TrackListView = ({
    data = [],  // By default empty.
    onSelect,
}: TrackListProps) => {

    /** Function for handling the Click of a list item. */
    function handleClick(e: React.MouseEvent<HTMLLIElement>) {
        onSelect(e.currentTarget.accessKey);
    }

    return (
        <ul>
            {data.map(track => 
            <li key={track.track_id} style={{listStyleType: 'none'}} onClick={handleClick}>
                <TrackDisplay name={track.name}
                artist={track.artist} image_url={track.image_url}/> 
            </li>)}
        </ul>
    );
}
