from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides full CRUD actions for Student.
    - GET    /api/students/       -> list all students
    - POST   /api/students/       -> create a student
    - GET    /api/students/{id}/  -> retrieve a student
    - PUT    /api/students/{id}/  -> update a student
    - DELETE /api/students/{id}/  -> delete a student
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
