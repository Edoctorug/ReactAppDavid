from rest_framework import routers
from django.urls import path

from .views import UploadImage

router = routers.DefaultRouter()

urlpatterns = [
    path('upload', UploadImage.as_view(), name='upload-image')
]

urlpatterns += router.urls
