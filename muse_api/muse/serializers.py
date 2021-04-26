"""
This module implements a serilizer for the Recommandation
model. https://www.django-rest-framework.org/api-guide/serializers/
"""
from rest_framework import serializers
from .models import Recommandation

class RecommandationSerializer(serializers.ModelSerializer):
    """ Serializer class for Recommandation Model. """
    class Meta:
        """ Meta information for creating the Serializer """
        model = Recommandation
        fields = ["title", "description", "trackId", "updated"]
