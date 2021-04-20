"""This module implements the track dataclass."""
from dataclasses import dataclass


@dataclass
class Track:
    """
    Data class that stores information about a single
    track.
    Member variables:
        track_id - The spotify id of the track
        name - The name of the Track
        artist - The name of the artist
        image_url - url to the image associated with the track
    """
    track_id: str
    name: str
    artist: str
    image_url: str
