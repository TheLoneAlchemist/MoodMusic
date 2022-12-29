
from django.forms import ModelForm, widgets
from django import forms
from .models import Song

class UplaodForm(ModelForm):
    class Meta:
        model = Song
        fields = "__all__"
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'artist':forms.TextInput(attrs={'class':'form-control'}),
            'tags':forms.TextInput(attrs={'class':'form-control'}),
            'copyrights':forms.TextInput(attrs={'class':'form-control'}),
            'image':forms.FileInput(attrs={'class':'form-control'}),
            'song':forms.FileInput(attrs={'class':'form-control'}),
        }