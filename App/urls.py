from django.urls import path

from MoodMusic.settings import MEDIA_ROOT
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path('login', views.LoginUser, name='login'),
    path('logout', views.LogoutUser, name='logout'),
    path('signup', views.SignupUser, name='signup'),
    
]