from django.contrib import admin
from .models import ReviewsRating
# Register your models here.
# admin.site.register(ReviewsRating)
@admin.register(ReviewsRating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['id','rating','comment']