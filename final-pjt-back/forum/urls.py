from django.urls import path
from . import views


urlpatterns = [
    path('<int:movie_pk>/', views.review),
    path('review/<int:review_pk>/', views.detail),
    path('<int:movie_pk>/review/comment/', views.comment),
    path('<int:movie_pk>/likes/', views.likes),
    path('block/<int:movie_pk>/', views.block),
]