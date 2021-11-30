from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import fields
from rest_framework.fields import ReadOnlyField


class User(AbstractUser):
    pass
