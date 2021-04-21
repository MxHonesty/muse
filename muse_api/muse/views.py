from django.shortcuts import render
from django.http import Http404
from rest_framework.exceptions import ParseError

from rest_framework.views import APIView
from rest_framework.response import Response
from .spotify.track_serializer import TrackSerializer
from .spotify.spotify_wrapper import SpotifyApi


class ListTracks(APIView):
    """
    View to list the results of the give
    spotify track search.
    """
    __api = SpotifyApi()

    def get(self, request):
        """Returns at most 5 tracks for the search.
        Http Args:
            track_name: string, what to search for.
            number: int, maximum number of results.
        Usage example:
            GET api/song/?track_name=<name>&nr=<number>
        """
        param_dict = request.GET  # QueryDict of parameters.
        try:
            track_name = param_dict.get('track_name')
            number = int(param_dict.get('nr'))
            print("TRACK NAME ", track_name)
            if track_name is None or number is None:
                raise ParseError(detail="Arguments missing")
        except(ValueError):
            raise ParseError(detail="Number invalid")

        data = self.__api.get_first_tracks(track_name, number)
        serializer = TrackSerializer(data, many=True)
        print("BODY", track_name, number)
        return Response(serializer.data)
