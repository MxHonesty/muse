import { TrackDisplayProps } from './TrackDisplay';
import { TrackDisplayForList } from './TrackDisplayForList';
import { TrackListProps} from './TrackListView';
import { withTrackId, WithTrackIdProps } from './withTrackId';
import { List } from '@material-ui/core';

/** Implementation of a TrackList view based on Material UI */
export const TrackScrollableList = ({
    data = [],
    onSelect = (track_id: string) => {},
}: TrackListProps) => {

    function handleClick(id: string) {
        onSelect(id);
    }

    const TrackDisplayWithId = withTrackId<TrackDisplayProps & WithTrackIdProps>(TrackDisplayForList);
    
    return (
        <List>
            {data.map(track => 
                <TrackDisplayWithId name={track.name} artist={track.artist}
                image_url={track.image_url} track_id={track.track_id} 
                getId={handleClick} key={track.track_id}/>
            )}
        </List>
    );
}
