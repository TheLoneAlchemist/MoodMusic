from django.contrib import admin
from .models import Song, Listenlater,History,Channel

# Register your models here.
admin.site.register(Song)
admin.site.register(Listenlater)
admin.site.register(History)
admin.site.register(Channel)