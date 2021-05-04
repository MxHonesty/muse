import { Story, Meta } from '@storybook/react';
import {
    SearchBar,
    SearchBarProps
} from '../../components/search/SearchBar';

import { TrackListView } from '../../components/search/TrackListView';

export default {
    title: 'Search Bar',
    component: SearchBar,
} as Meta;

const Template: Story<SearchBarProps> = (args) => 
<SearchBar
    call={args.call}
> 
{(data: Array<any>) => { return <TrackListView data={data} onSelect={(trackId) => {console.log(trackId);}}/> }} 
</SearchBar>

export const SearchBarGeneric = Template.bind({});
SearchBarGeneric.args = {
    call: async (name) => {
        let text = "{}";
        return text;
    }
};
