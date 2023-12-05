from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ReviewsRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    brewery_id = models.CharField(max_length=100)
    rating = models.IntegerField()
    comment = models.TextField(default="None")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    