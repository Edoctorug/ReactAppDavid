

from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password

from .serializers import RegistrationSerializer, UserSerializer
from .services import login


class UserViewSet(ModelViewSet):
    """
    This class will be responsible for retriving all the user information 
    like the username, email, roles and permisions
    """
    pass


class RegisterView(APIView):
    """
    This class is responsoble for user registration.
    After registration, a user is logged in automatically
    """

    def post(self, request):
        """
        Handle the post request to register a new user.
        The method expects: Username, Email, Password, Password confirmation, 
        and or other fields as may be reqiured
        """
        data = request.data
        serializer = RegistrationSerializer
        serialized = serializer(data=data)
        if serialized.is_valid():

            # To ensure the password is hashed,
            # Isolate the password
            password = serialized.validated_data['password']

            # Hash it
            serialized.validated_data['password'] = make_password(password)

            # Then save the user
            user = serialized.save()
            response_data = login(user)

            return Response(response_data)
        else:
            return Response(serialized.errors)


class LoginView(APIView):
    """
    This class is responsible for user login.
    A user is expected to provide a username or email and password
    """
