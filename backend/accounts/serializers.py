from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Lisence


class RegistrationSerializer(serializers.ModelSerializer):
    """
    This is the serializer responsible for registraion.
    We set the model to User and all fields.
    """
    class Meta:
        model = get_user_model()
        fields = '__all__'


class LoginSerializer(serializers.Serializer):
    """
    Custom login serializer. We need either of a pair of username and password or email and password
    """
    email_or_username = serializers.CharField(
    )  # Holds the username or password from the user
    password = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    """
    The serializer that picks a few of the fields from the user model
    """
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email']


class LisenceSerializer(serializers.ModelSerializer):
    """
    The lisence serializer takes all fields of the model Lisence.
    """
    class Meta:
        model = Lisence
        fields = '__all__'
