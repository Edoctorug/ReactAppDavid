from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from rest_framework.authtoken.models import Token

# Create your models here.


class CustomUserManager(UserManager):
    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The email address must be provided')

        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self._create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """
    A custom User class implementing a fully featured User model with
    admin-compliant permissions.

    Username or Email and password are required. Other fields are optional.
    """

    username = models.CharField(
        verbose_name="Username", max_length=25, blank=True)
    email = models.EmailField(
        verbose_name='Email Address', max_length=100, unique=True)
    password = models.CharField(verbose_name='Password', max_length=255)
    role = models.CharField(verbose_name='Role', max_length=25, blank=True)
    image = models.ImageField(upload_to='profiles-images', blank=True)
    phone = models.CharField(max_length=25, blank=True)

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class Lisence(models.Model):
    """
    The lisence will be a file/image with two required fields ( user and file ) and two option fields
    ( role and name).
    The user is the custom user instance that owns the lisence, file is the actual file content, name 
    is the name of the file optionally provided and the role is the same as the user role ( Doctor, Pharmacy, etc) 
    """
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, verbose_name='user')
    role = models.CharField(max_length=25, verbose_name='role', blank=True)
    name = models.CharField(
        max_length=225, verbose_name='File Name', blank=True)
    file = models.FileField(verbose_name='file', upload_to='lisences')

    def __str__(self) -> str:
        return f"{self.user.username}'s lisence"
