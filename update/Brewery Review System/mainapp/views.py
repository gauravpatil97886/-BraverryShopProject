from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
import requests
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.views import View
from .forms import loginform, registration_form
from .models import ReviewsRating
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model



User = get_user_model() 

class register(View):
    def get(self, request):
        form = registration_form
        return render(request, "register.html", {'form': form})
    
    def post(self, request):
        form = registration_form(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            
            if User.objects.filter(username=username).exists():
                form.add_error('username', 'Username already exists. Please choose a different one.')
                return render(request, "register.html", {'form': form})
            
            user = User.objects.create_user(username=username, password=password)
            user.save()
            
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('list_brewery')
        return render(request, "register.html", {'form': form})


from django.contrib.auth import authenticate, login, logout


class Login(View):
    def get(self, request):
        form = loginform()
        return render(request, "login.html", {"form": form})
    
    def post(self, request):
        form = loginform(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                return redirect('list_brewery')
            else:
                error_message = "User does not exist. Please register."
                messages.error(request, error_message)  
                return render(request, "login.html", {"form": form})
        return render(request, "login.html", {"form": form})


@login_required(login_url='login')
def list_brewery(request):
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






# from .models import ReviewsRating

# def your_view(request):
#     # Assuming 'Rating' is your model and you want to fetch all ratings
#     rate = rating.objects.all()  # Fetch all ratings, adjust this query as per your need

#     context = {
#         'rate': rate,
#         'stars': range(5),  # Assuming a maximum of 5 stars
#     }
#     return render(request, 'detail.html', context)