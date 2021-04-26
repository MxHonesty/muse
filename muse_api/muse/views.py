from django.shortcuts import render
from django.http import Http404
from django.utils import timezone
from rest_framework.exceptions import ParseError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .spotify.track_serializer import TrackSerializer
from .spotify.spotify_wrapper import SpotifyApi

from .serializers import RecommandationSerializer
from .models import Recommandation

import random
import datetime


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
        Raises:
            ParseError: If bad request or invalid arguments
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

class RecommandationApiView(APIView):
    """ https://blog.logrocket.com/django-rest-framework-build-an-api-in-15-minutes/ """
    
    def get(self, request, *args, **kwargs):
        """
        List all Recommandations updated in the past day.
        """
        saptamana_trecuta = timezone.now() - datetime.timedelta(days=1)

        recommands = Recommandation.objects.filter(updated__gte=saptamana_trecuta)
        serializer = RecommandationSerializer(recommands, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """ Created a Recommandation withh the given data """
        data = {
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'trackId': request.data.get('trackId'),
            'updated': str(timezone.now())
        }
        serializer = RecommandationSerializer(data=data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecommandationApiRandom(APIView):
    """ API for random recommandations """

    def get(self, request, *args, **kwargs):
        """ Gets a single random recommandation """
        all_recs = Recommandation.objects.all()
        if(len(all_recs) == 0):
            raise Http404
        random_item = random.choice(all_recs)
        serializer = RecommandationSerializer(random_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
