"""
Test case modules for the Spotify Wrapper module.
"""
from django.test import TestCase
from ..spotify.spotify_wrapper import SpotifyApi


class SpotifyWrapperTest(TestCase):
    """ Testing class for my custom Spotify Wrapper. """

    def setUp(self):
        self.__spotify = SpotifyApi()  # Initialize api wrapper

    def test_get_first_tracks_very_specific(self):
        """
        Test case for a very specific query that should only yield
        one item.
        """
        rez = self.__spotify.get_first_tracks("paradise nle choppa", 5)
        # Last line should find one track.
        self.assertEqual(len(rez), 1)

    def test_get_first_tracks_multiple_tracks(self):
        """
        Test case for searching a general name that should yield
        multiple search results.
        """
        rez = self.__spotify.get_first_tracks("paradise", 10)
        # Should find 10 items
        self.assertEqual(len(rez), 10)

    def test_get_first_tracks_random_query(self):
        """A query that should yield no result."""
        rez = self.__spotify.get_first_tracks("asadbag4gqrfdsav", 10)
        self.assertEqual(len(rez), 0)

    def test_get_first_tracks_track_dataclass(self):
        """A test for interacting with the resulting Track object."""
        rez = self.__spotify.get_first_tracks("paradise nle choppa", 1)
        self.assertEqual(rez[0].name, "Paradise")
        self.assertEqual(rez[0].artist, "NLE Choppa")
