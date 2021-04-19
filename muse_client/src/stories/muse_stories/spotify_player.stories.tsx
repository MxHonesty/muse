import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Player, PlayerProps } from '../../components/spotify_player';

export default {
  title: 'Spotify Player',
  component: Player,
} as Meta;

const Template: Story<PlayerProps> = (args) => <Player {...args} />;

export const Album = Template.bind({});
Album.args = {
  view: 'list',
  theme: 'black',
  uri: 'spotify:album:1TIUsv8qmYLpBEhvmBmyBk',
};

export const Track = Template.bind({});
Track.args = {
  view: 'list',
  theme: 'black',
  uri: 'spotify:track:1nJE8TEWK9hf9Bl0pekJCi',
};
