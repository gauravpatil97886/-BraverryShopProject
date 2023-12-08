from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class registration_form(UserCreationForm):
    class Meta:
        model = User
        fields = ['email', 'username']
        
class loginform(forms.Form):
    username = forms.CharField(max_length=50)
    password = forms.CharField(max_length=10)