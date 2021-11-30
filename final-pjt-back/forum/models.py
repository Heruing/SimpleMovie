from django.db import models
from django.db.models.enums import IntegerChoices
from django.db.models.fields import IntegerField, TextField
from django.conf import settings

class Movie(models.Model):
    movie_id = IntegerField(primary_key=True)
    like_user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name= 'like_movie')


class Review(models.Model):
    title = models.CharField(max_length=100)
    movie_id = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rank = IntegerField(default=5)
    content = TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content

class Block(models.Model):
    movie_id = IntegerField(primary_key=True)