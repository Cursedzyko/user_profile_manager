from .models import CustomUser, UserInfoDetailed
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = CustomUser
        fields = ["email", "first_name", "last_name", "password", "confirm_password"]
    
    def validate(self, data):
        """ Check if passwords match """
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data
    
    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
class UserInfoSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")

    class Meta:
        model = UserInfoDetailed
        fields = ["first_name", "last_name", "age", "education", "profession", "bio", "goals", "motivations", "concerns"]

        