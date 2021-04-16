import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Player, PlayerProps } from '../../components/spotify_player';

export default {
  title: 'Spotify Player',
  component: Player,
} as Meta;

const Template: Story<PlayerProps> = (args) => <Player {...args} />;

export const ListBlackTheme = Template.bind({});
ListBlackTheme.args = {
  view: 'list',
  theme: 'black',
  uri: 'spotify:album:1TIUsv8qmYLpBEhvmBmyBk',
};
