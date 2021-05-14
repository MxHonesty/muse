/** Module implements a type of TrackDisplay that
 * turns into a spotify iframe player when clicked.
 */
import { Component } from 'react';
import { TrackDisplayProps } from '../search/TrackDisplay';
import { TrackDisplayForList } from '../search/TrackDisplayForList';
import { withTrackId, WithTrackIdProps } from '../search/withTrackId';
import { GenericPlayer } from '../GenericPlayer';


/** Extra props added by this component. */
interface ExtraProps {
    /** We are adding a track_id propery to the component */
    track_id: string,
}

interface TDWPState {
    /** Set to true if the component has been clicked. */
    wasClicked: boolean
}

/** A Track Display that gets replaced by a spotify iframe when clicked. */
export class TrackDisplayWithPlayer extends Component<TrackDisplayProps & ExtraProps, TDWPState> {
    constructor(props: TrackDisplayProps & ExtraProps){
        super(props);
        this.state = {wasClicked: false};

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            wasClicked: true,
        });
    }

    componentDidUpdate(prevProps: TrackDisplayProps & ExtraProps) {
        if(prevProps.track_id !== this.props.track_id)
            this.setState({wasClicked: false});
    }

    render() {
        const TrackDisplayWithId = withTrackId<TrackDisplayProps & WithTrackIdProps>(TrackDisplayForList);
        const {track_id, ...other_props} = this.props;  // Spreading props
        return(
            <div>
                {!this.state.wasClicked ? <TrackDisplayWithId {...other_props} 
                track_id={''} getId={this.onClick}/> : <GenericPlayer id={track_id} type='track'/>}
            </div>
        );
    }

}
