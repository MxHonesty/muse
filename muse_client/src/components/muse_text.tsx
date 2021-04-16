import React from 'react';

export interface TextProps {
    /**
     * The message to be displayed.
    */
    message: string;
}


/**
 * A simple boilerplate text display used for testing
 * the stories library.
*/
export const MuseText = ({ message }: TextProps) => <div>{message}</div>;