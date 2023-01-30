from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import get_authorization_header, TokenAuthentication
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.db.models import Q

from .serializers import RegistrationSerializer, LoginSerializer, LisenceSerializer
from .services import getOrCreatToken
from .permissions import IsAuthenticated
from .models import Lisence


class UserView(APIView):
    """
    This class will be responsible for retriving all the user information 
    like the username, email, roles and permisions
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        print(request.auth)
        return Response({'key': ''})


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

            # After storing a user, store a licence too
            if ('lisence' in request.data):
                """
                Later after a good review, this logic should be implimented using django signals 
                """
                file_serializer = LisenceSerializer(
                    data={'file': request.data['lisence'], 'user': user.id}, context={'request': request})
                file_serializer.is_valid(raise_exception=True)
                file_serializer.save()

            response_data = getOrCreatToken(user)

            return Response(response_data)
        else:
            return Response(serialized.errors)


class LoginView(APIView):
    """
    This class is responsible for user login.
    A user is expected to provide a username or email and password
    """

    def post(self, request):

        # Pass the request data to the login serializer
        serializer = LoginSerializer(data=request.data)

        # Validate the serializer and if there are any errors, return a 403
        serializer.is_valid()
        if serializer.errors:
            return Response(data={'message': 'Bad request'}, status=403)

        # If the data is valid, get the username or email and password from the validated data of the serializer
        email_or_username = serializer.validated_data['email_or_username']
        password = serializer.validated_data['password']

        # Check whether a user exists with the provided username or email
        user = get_user_model().objects.filter(Q(username=email_or_username)
                                               | Q(email=email_or_username)).first()

        # If the user does not exist, then return an error message
        if not user:
            return Response(data={'message': 'Invalid cridentials.'}, status=403)

        # If the user exists, then check whether the password provided is correct
        auth_result = user.check_password(raw_password=password)

        # If the password is incorrect, still return an error message.
        if not auth_result:
            return Response(data={'message': 'Invalid cridentials.'}, status=403)

        # If the password is correct, then handle token authentication.
        data = getOrCreatToken(user)

        user = authenticate(request=request)
        print(user)
        return Response(data=data)


class CustomAuthToken(ObtainAuthToken):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        email_or_username = serializer.validated_data['email_or_username']
        password = serializer.validated_data['password']
        user = get_user_model().objects.filter(Q(username=email_or_username)
                                               | Q(email=email_or_username)).first()

        if not user.check_password(password):
            raise ValueError('User not found')
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
