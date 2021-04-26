import React from 'react';

export interface PlayerProps {
    /** The type of view the of the embed. */
    view?: 'list';
    /** The theme color of the embed. Only Black for now. */
    theme?: 'black';
    /** The URI for the content. */
    uri: string;  // TODO: Validare de format pe URI.
}

/** Web player for given uri.
 *  Scales to fit container size.
 */
export const Player = ({
    view = 'list',
    theme = 'black',
    uri
}: PlayerProps) => {
    return(
        <iframe
            title='Spotify'
            className='SpotifyPlayer'
            //src={`https://open.spotify.com/embed/track/1nJE8TEWK9hf9Bl0pekJCi`}
            src={`https://embed.spotify.com/?uri=${uri}&view=${view}&theme=${theme}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowTransparency={true}
        />
    );
}
