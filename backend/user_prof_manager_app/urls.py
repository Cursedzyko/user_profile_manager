from django.urls import path
from .views import SignupAPIView, LoginAPIView, UserInfo

urlpatterns = [
    path("signup/", SignupAPIView.as_view() , name="signup"),
    path("login/", LoginAPIView.as_view() , name="login"),
    path("user_info/", UserInfo.as_view() , name="user_info"),

]
