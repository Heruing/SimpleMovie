from rest_framework import serializers
from .models import Review, Comment, Movie, Block


class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model=Movie
        fields= '__all__'

class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model=Review
        read_only_fields = ('id', 'created_at', 'updated_at', 'user')
        fields= '__all__'

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model=Comment
        fields= '__all__'


class BlockSerializer(serializers.ModelSerializer):

    class Meta:
        model=Block
        fields= ('movie_id',)