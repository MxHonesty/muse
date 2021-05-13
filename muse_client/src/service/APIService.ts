/** This Module Defines Functions used for making API calls. */

import { Track } from "../components/search/TrackListView";

var base_url = 'http://127.0.0.1:8000/api/';

/** Function used for sending a POST request to the Recommandations API with
 * Arbitrary data.
 */
export const post_recommandation = async (data: Object) => {
    await fetch(base_url + 'recs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

/** Get the Track with the given ID.
 * This Function does not handle the situation
 * of an invalid id.
 */
export const get_track = async (trackId: string) => {
    let rez = await fetch(base_url + `track/?id=${trackId}`);
    let new_track: Track = await rez.json();
    return new_track;
}

/** Gets the First 5 tracks for the given name as a string
 * of a json.
 */
export const get_first_5_as_string = async (name: string) => {
    let res = await fetch(base_url + `song/?track_name=${name}&nr=5`);
    let text = await res.text();
    return text;
}

export interface Recommendation {
  title: string,
  description: string,
  trackId: string,
  updated: string,
}

/** Gets a random Track from the API */
export const get_random_recommendation = async () => {
  let rez = await fetch(base_url + 'random/');
  let new_rec: Recommendation = await rez.json();
  return new_rec;
}
