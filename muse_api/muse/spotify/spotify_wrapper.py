"""
Module that implements a wrapper for the spotify reltated
functionalities.
"""
# TODO: Handle spotipy cache
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from .track import Track
from .custom_cache_handler import MemoryCacheHandler


class SpotifyApi:
    """
    Pure fabrication class that encapsulates all the spotify logic
    needed for this api.
    Interacts with spotify api through the spotipy library.
    """
    def __init__(self):
        # Spotify wrapper object.
        self.__sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
            client_id="4453d7ed53d748069267703e16a41e5c",
            client_secret="5c8ff7ac11924faba56b38a9f5e09dbd",
            cache_handler=MemoryCacheHandler()
        ), )

    def get_first_tracks(self, search: str, number: int) -> list:
        """
        Get the first number tracks for the given search.
        Args:
            search: the text query, usually the title of the song
            number: the maximum number of items to display
        Returns:
            A list of Track instances.
        """
        res_list = []  # List of Tracks
        query_results = self.__sp.search(search, number)
        for track in query_results['tracks']['items']:
            new_track = Track(track['id'], track['name'], track['artists'][0]['name'],
            track['album']['images'][1]['url'])

            res_list.append(new_track)

        return res_list
