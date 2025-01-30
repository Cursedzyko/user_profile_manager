from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name="", last_name="", password=None):
        """
        Create and return a superuser with an email, first name, last name, and password.
        """
        user = self.create_user(email, first_name, last_name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    password = models.CharField(max_length=128)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = "email"
    
    def __str__(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        """
        Checks if the user has the specific permission.
        """
        return self.is_superuser  # You can customize this logic based on your needs.

    def has_module_perms(self, app_label):
        """
        Checks if the user has permission to view a specific module.
        """
        return self.is_superuser  # You can customize this logic based on your needs.

class UserInfoDetailed(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="info")
    age = models.PositiveIntegerField(null=True, blank=True)  # Ensuring no negative ages
    education = models.CharField(max_length=255, blank=True, null=True)
    profession = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(max_length=300, blank=True, null=True)
    goals = models.TextField(max_length=300, blank=True, null=True)
    motivations = models.TextField(max_length=300, blank=True, null=True)
    concerns = models.TextField(max_length=300, blank=True, null=True)

    def __str__(self):
        return f"user {self.user.email}"
