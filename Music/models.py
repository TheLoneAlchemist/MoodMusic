from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Song(models.Model):
    song_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=500,unique=True)
    artist = models.CharField(max_length=200, blank=True)
    tags = models.CharField(max_length=30,blank=True)
    copyrights = models.CharField(max_length=100,null=True)
    image = models.ImageField(upload_to ='images')
    song = models.FileField(upload_to='musics')


    def __str__(self) -> str:
        return self.title
    


class Listenlater(models.Model):
    listen_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    song_id = models.CharField(max_length=104857,default="")

    def __str__(self) -> str:
        songobj = Song.objects.filter(song_id = self.song_id).first()
        if(songobj is not None):
            return f"{songobj.title} : {self.user}"
        else:
            return f"SongObj return NoneType:{self.user}"


class History(models.Model):
    history_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    music_id = models.CharField(max_length=104857,default="")

    def __str__(self) -> str:
        songobj = Song.objects.filter(song_id = self.music_id).first()

        if(songobj is not None):
            return f"{songobj.title} : {self.user}"
        else:
            return f"SongObj return NoneType:{self.user}"




class Channel(models.Model):
    channel_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length= 3999)
    music = models.CharField(max_length=1048)

    def __str__(self) -> str:
        return f"{self.name}"
    