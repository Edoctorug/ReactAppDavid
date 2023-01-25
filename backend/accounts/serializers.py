from rest_framework import serializers
from django.contrib.auth import get_user_model


class RegistrationSerializer(serializers.ModelSerializer):
    """
    This is the serializer responsible for registraion.
    We set the model to User and all fields.
    """
    class Meta:
        model = get_user_model()
        fields = '__all__'


class LoginSerializer(serializers.Serializer):
    email_or_username = serializers.CharField()
    password = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email']
