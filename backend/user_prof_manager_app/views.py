from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
from .models import UserInfoDetailed
from .serializers import UserSerializer, UserInfoSerializer

class SignupAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            update_last_login(None, user)
            
            user_info, created = UserInfoDetailed.objects.get_or_create(user=user)
            
            return Response({
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
            })
        else:
            return Response(
                {"error" : "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
            
class UserInfo(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserInfoSerializer
    
    def get(self, request):
        user_info = request.user.info
        
        serializer = self.serializer_class(user_info)
        return Response(serializer.data)
    
    def put(self, request):
        user_info = request.user.info
        serializer = UserInfoSerializer(user_info, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User info updated successfully", "data": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)