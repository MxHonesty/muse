from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

class ListTracks(APIView):
    """
    View to list the results of the give
    spotify track search.
    """

    def get(self, request):
        """Returns at most 5 tracks for the search."""
        
        pass