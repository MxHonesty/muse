from django.urls import path
from . import views

urlpatterns = [
    path('song/', views.ListTracks.as_view())
]