from django import forms

from progpac.core import models


class Editor(forms.Form):
    text = forms.CharField(
        widget=forms.Textarea(
            attrs={
                'class':'span6',
                'rows':'6'
            }
        ))
