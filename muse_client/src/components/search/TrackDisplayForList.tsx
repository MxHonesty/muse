import { TrackDisplayProps } from './TrackDisplay';
import { Avatar, ListItem, ListItemText, ListSubheader } from '@material-ui/core';

/** Displays Track Data making use of Material UI
 *  Uses sames props as TrackDisplay
 */
export const TrackDisplayForList = ({name, artist, image_url}: TrackDisplayProps) => {
    return (
            <ListItem key={"key-" + image_url} button={true} divider={true}>
                <Avatar src={image_url} variant='square' 
                style={{height:'5em', width:'5em'}}/>
                <ListItemText inset={true}>{name}</ListItemText>
                <ListSubheader>{artist}</ListSubheader>
            </ListItem>
    )
}
