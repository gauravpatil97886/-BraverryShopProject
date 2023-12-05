from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
import requests
from .models import ReviewsRating
from django.contrib.auth.models import User
from django.views import View
from .forms import registration_form, loginform
# Create your views here.
from django.contrib.auth.decorators import login_required


class register(View):
    def get(self,request):
        form = registration_form
        return render(request,"register.html", {'form':form})
    
    def post(self,request):
        form = registration_form(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                form = login(request, user)
                return redirect('list_brewery')
        return render(request,"register.html", {'form':form})
        

from django.contrib.auth import authenticate, login, logout



class Login(View):
    def get(self, request):
        form = loginform
        return render(request, "login.html", {"form": form})
    def post(self, request):
        form = loginform(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                    form = login(request, user)
                    return redirect('list_brewery')
        return render(request, "login.html",
                      {"form": form, "error": "check your credential"})

@login_required(login_url='login')
def list_brewery(request):
    # url = 'https://api.openbrewerydb.org/v1/breweries'
    # re = requests.get(url)
    # data = re.json()[0]
    return render(request, 'index.html')
@login_required(login_url='login')
def detail_brewery(request,id):
    url = 'https://api.openbrewerydb.org/v1/breweries/'+id
    re = requests.get(url)
    data = re.json()
    rate = ReviewsRating.objects.filter(brewery_id=id)
    context = {
        'data':data,
        'rate':rate,
    }
    return render(request, 'detail.html', context)

def Logout(request):
    logout(request)
    return redirect("login")

import json
@login_required(login_url='login')
def rating(request):
    data = json.loads(request.body)
    data_id = data['data_id']
    rating = data['rating']
    comment = data['comment']
    ReviewsRating.objects.create(user=request.user,brewery_id=data_id, rating=rating, comment=comment)
    return JsonResponse({'suceess':'asdfghjkl'})