"""
Test case modules for the Spotify Wrapper module.
"""
from django.test import TestCase
from ..spotify.spotify_wrapper import SpotifyApi
from spotipy import SpotifyException


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

    def test_get_track(self):
        """ A test for the get_track service functionality. """
        rez = self.__spotify.get_track("2E2ZVy2fxslpAUgbb4zu84")
        self.assertEqual(rez.track_id, "2E2ZVy2fxslpAUgbb4zu84")
        self.assertEqual(rez.name, "Abracadabra")
        self.assertEqual(rez.artist, "Steve Miller Band")
        self.assertEqual(rez.image_url, "https://i.scdn.co/image/ab67616d00001e02b80d7868e6e0275d12102508")

    def test_get_track_with_wrong_id(self):
        """ A test case for an invalid track id. 
        We Except the lambda code to throw a Spotify Exception
        """
        self.assertRaises(SpotifyException, lambda: self.__spotify.get_track("asdasd"))
