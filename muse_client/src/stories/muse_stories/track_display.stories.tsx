import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    TrackDisplay,
    TrackDisplayProps
} from '../../components/search/track_display';

export default {
    title: 'Track Display',
    component: TrackDisplay,
} as Meta;

const Template: Story<TrackDisplayProps> = (args) => <TrackDisplay {...args} />;

export const FullValues = Template.bind({});
FullValues.args = {
    name: 'Crazy Train',
    artist: 'Ozzy Osbourne',
    image_url: 'https://i.scdn.co/image/ab67616d00001e02475ca6e5c1ce0ef70740c3c6',
};
