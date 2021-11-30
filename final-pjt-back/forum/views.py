from django.http.response import Http404
from django.shortcuts import render

from django.shortcuts import get_object_or_404

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ReviewSerializer, MovieSerializer, CommentSerializer, BlockSerializer
from .models import Review, Movie, Comment, Block
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

from django.core import serializers




@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([AllowAny])
def review(request, movie_pk):
    if not Movie.objects.filter(movie_id=movie_pk).exists():
        Movie.objects.create(movie_id=movie_pk)
    if request.method == 'GET':
        reviews = Review.objects.filter(movie_id=movie_pk).order_by('-pk')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def detail(request, review_pk):
    if request.method == 'GET':
        review = get_object_or_404(Review, id=review_pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        review = get_object_or_404(Review, id=review_pk)
        if review.user == request.user:
            review.delete()
        return Response({ 'status': 'deleted' }, status=status.HTTP_202_ACCEPTED)


from accounts.models import User
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def likes(request, movie_pk):
    if movie_pk:
        if not Movie.objects.filter(pk=movie_pk).exists():
            Movie.objects.create(movie_id=movie_pk)
        
        movie =get_object_or_404(Movie, pk=movie_pk)
        if movie.like_user.filter(pk=request.user.pk).exists():
            movie.like_user.remove(request.user)
        else:
            movie.like_user.add(request.user)
    user = User.objects.get(username = request.user)
    movies = user.like_movie.values('pk')
    data = []
    for movie in movies:
        data.append(movie['pk'])
    return Response(data, status=status.HTTP_202_ACCEPTED)




@api_view(['POST'])
@permission_classes([AllowAny])
def block(request, movie_pk):
    user = User.objects.get(username=request.user)
    if not user.is_superuser: return Response('fail', status=status.HTTP_400_BAD_REQUEST)

    if movie_pk:
        if Block.objects.filter(movie_id=movie_pk).exists():
            Block.objects.filter(movie_id=movie_pk).delete()
        else:
            Block.objects.create(movie_id=movie_pk)
    
    blocks = Block.objects.all()
    serializer = BlockSerializer(blocks, many=True)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)






















    
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([AllowAny])
def comment(request):
    if request.method == 'GET':
        review = get_object_or_404(Review, pk=request.data.review_id)
        comments = review.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        comment = get_object_or_404(Comment, pk=request.comment.id)
        if not request.user.comment_set.filter(pk=request.comment.id).exists():
            return Response({ 'detail': 'not allowed'}, status=status.HTTP_403_FORBIDDEN)
        comment.delete()
        return Response({ 'id': request.comment.id }, status=status.HTTP_202_ACCEPTED)