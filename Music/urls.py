from django.urls import path

from . import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('songlist',views.Songlist, name='songlist'),
    path('songlisten/<int:id>',views.Songlisten, name='songlisten'),
    path('listenlater', views.Listenlaterfun, name='listenlater'),
    path('history', views.Historyfun, name='history'),
    path('channel/<str:cname>', views.ChannelFuc, name='channel'),
    path('search', views.Search, name='search'),
    path('upload', views.Upload, name='upload'),
    path('profile', views.profile, name='profile'),
    path('play', views.Play, name='play'),
    path('getemotion', views.GetEmotion, name='getemotion'),
    
]