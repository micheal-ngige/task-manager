from django.urls import path
from .views import TaskListCreateView, TaskRetrieveUpdateDestroyView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='create_task'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroyView.as_view(), name='get_put_delete_task'),
]
