from rest_framework.authtoken.models import Token
from .models import CustomUser
from .serializers import UserSerializer


def login(user: "CustomUser") -> dict:
    """
    This handles login, takes in a user.
    It then creates a token for the user and returns that token.
    The token is then used by the front end clients for authentication
    """
    token = Token.objects.create(user=user)
    data = {
        'token': token.key,
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'role': user.role,
        }
    }

    return data
