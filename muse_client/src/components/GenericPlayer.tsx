import React from 'react';

export interface GenericPlayerProps {
    /**
     * The type of media to play. Either
     * Album or Track
     */
    type: 'album' | 'track',

    /**
     * The id of the media to be played.
     */
    id: string
}

/**
 * Web player for given uri.
 * Scales to fit container size.
 * This version of the player is generic
 * in the sense that it requires the type
 * and id separatly.
 * This Player uses the latest embed recommanded.
 * @param type the type of media, either album or track as a string
 * @param id the id of the media as string.
 */
export const GenericPlayer = ({
    type = 'track',
    id ='1nJE8TEWK9hf9Bl0pekJCi'
}: GenericPlayerProps) => {
    return(
        <iframe
            title='Spotify'
            className='SpotifyPlayer'
            src={`https://open.spotify.com/embed/${type}/${id}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowTransparency={true}
            allow="encrypted-media"
        />
    );
}
