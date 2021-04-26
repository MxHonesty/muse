from django.urls import path
from . import views

urlpatterns = [
    path('song/', views.ListTracks.as_view()),
    path('recs/', views.RecommandationApiView.as_view()),
    path('random/', views.RecommandationApiRandom.as_view()),
]