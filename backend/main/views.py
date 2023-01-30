from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from accounts.models import Lisence
from accounts.serializers import LisenceSerializer


class UploadImage(APIView):
    def post(self, request):
        if ('file' in request.data):
            serializer = LisenceSerializer(
                data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response('Invalid request', status=status.HTTP_400_BAD_REQUEST)
