/**
 * Module implements the details view of a single track.
 */

/** The props for the TrackDisplay. */
export interface TrackDisplayProps {
    /** Name of the song. */
    name: string;

    /** Name of the artist */
    artist: string;

    /** The url of the image. */
    image_url: string;
}

/** Display information about a track
 * such as name, artist name and the album
 * cover image.
 */
export const TrackDisplay = ({name, artist, image_url}: TrackDisplayProps) => {
    return (
        <div>
            <img src={image_url} alt={name} />
            <span><h3>{name}</h3> by <h2>{artist}</h2></span>
        </div>
    )
}
