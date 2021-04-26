""" Models for the muse application.
Includes the Recommandation model that stores
TrackID and information about the recommandation.
Such as usefullness, message, title. 
"""

# TODO aici https://docs.djangoproject.com/en/3.2/ref/validators/
# De implmentat validatori

# https://docs.djangoproject.com/en/3.2/topics/db/models/
from django.db import models

class Recommandation(models.Model):
    """ Includes information about a single Recommandation. """
    
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    trackId = models.CharField(max_length=150)  # Id of the recommanded track
    updated = models.DateTimeField(auto_now=True, blank=True)  # Date updated

    def __str__(self):
        """ String representation of the Recommandation model. """
        return self.title  # Title is the string representation.
