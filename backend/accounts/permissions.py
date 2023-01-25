from rest_framework.permissions import BasePermission
from rest_framework.authentication import get_authorization_header
from rest_framework.authtoken.models import Token


class IsAuthenticated(BasePermission):
    keyword = 'Token'

    def has_permission(self, request, view):
        auth = get_authorization_header(request).split()

        if not auth:
            return False

        if len(auth) != 2:
            print('too short auth')
            return False

        try:
            key = auth[1].decode()
        except:
            print('invalid key')
            return False

        try:
            token = Token.objects.get(key=key)
        except:
            return False

        if token.user.is_active:
            request.user = token.user
            request.auth = token.key

            return True
        return False
