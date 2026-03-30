from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    # Map snake_case Python fields to camelCase for the Angular frontend
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')

    class Meta:
        model = Student
        fields = ['id', 'firstName', 'lastName', 'grade', 'email']
