from django.db import models
from django.conf import settings

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('not_completed', 'Not Completed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.CharField(max_length=6, choices=PRIORITY_CHOICES)
    due_date = models.DateField()
    completed = models.CharField(max_length=15, choices=STATUS_CHOICES, default='not_completed')

    def __str__(self):
        return self.title
