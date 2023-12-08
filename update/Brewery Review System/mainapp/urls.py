from django.urls import path, include
from .views import list_brewery, detail_brewery, rating, register, Login, Logout

urlpatterns = [
    path('brewery/',list_brewery, name="list_brewery"),
    path('brewery/<id>/',detail_brewery, name="detail_brewery"),
    path('rating/',rating, name= "rating"),
    path('',register.as_view(), name='register'),
    path('login/', Login.as_view(), name="login"),   
    path('logout', Logout, name="logout")
]
