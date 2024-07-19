# backend/tasks/serializers.py
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'priority', 'due_date', 'completed']

    def validate_completed(self, value):
        if value not in dict(Task.STATUS_CHOICES).keys():
            raise serializers.ValidationError("Invalid status value")
        return value
