from django.urls import path

from .views import RegisterView, LoginView, UserView, CustomAuthToken

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='Signup'),
    path('login/', LoginView.as_view(), name='Login'),
    path('user/', UserView.as_view(), name='user')
]
