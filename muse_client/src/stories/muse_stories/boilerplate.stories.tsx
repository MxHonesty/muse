import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import { MuseText } from '../../components/MuseText';

// TODO: https://storybook.js.org/docs/react/get-started/setup

export default {
    title: "Text Boilerplate",
    component: MuseText,
}
const Template: Story<ComponentProps<typeof MuseText>> = 
    (args) => <MuseText message={args.message}/>;

export const SalutMessage = Template.bind({});
SalutMessage.args = {
    message: "salut",
};
