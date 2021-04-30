import { TrackDisplay } from './track_display';

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
    data?: Array<Track>
}

export const TrackListView = ({
    data = [],  // By default empty.
}: TrackListProps) => {
    return (
        <ul>
            {data.map(track => 
            <li key={track.track_id} style={{listStyleType: 'none'}}>
                <TrackDisplay name={track.name}
                artist={track.artist} image_url={track.image_url}/> 
            </li>)}
        </ul>
    );
}
