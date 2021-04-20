"""
This module implements a serilizer for the track
dataclass. https://www.django-rest-framework.org/api-guide/serializers/
"""
from rest_framework import serializers


class TrackSerializer(serializers.Serializer):
    """ Serializer class for the Track class."""
    track_id = serializers.CharField(max_length="100")
    name = serializers.CharField(max_length="100")
    artist = serializers.CharField(max_length="100")
    image_url = serializers.CharField(max_length="500")
