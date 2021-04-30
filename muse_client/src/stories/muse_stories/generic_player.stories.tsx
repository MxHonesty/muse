import React from 'react';
import { Story, Meta } from '@storybook/react';
import { 
    GenericPlayer, 
    GenericPlayerProps 
} from '../../components/GenericPlayer'

export default {
    title: 'Generic Spotify Player',
    component: GenericPlayer,
} as Meta;

const Template: Story<GenericPlayerProps> = (args) => <GenericPlayer {...args}/>;

export const GenericAlbum = Template.bind({});
GenericAlbum.args = {
    id: '1TIUsv8qmYLpBEhvmBmyBk',
    type: 'album',
};

export const GenericTrack = Template.bind({});
GenericTrack.args = {
    id: '1nJE8TEWK9hf9Bl0pekJCi',
    type: 'track',
}
