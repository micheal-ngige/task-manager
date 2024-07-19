import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios directly
import { ListGroup, Button, Alert } from "react-bootstrap";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:8000/api",
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    api
      .get("/tasks/")
      .then((response) => {
        setTasks(response.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tasks.");
      });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (taskId) => {
    api
      .delete(`/tasks/${taskId}/`)
      .then(() => {
        fetchTasks();
        setNotification("Task deleted successfully.");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete task. Please try again.");
      });
  };

  const handleSuccess = () => {
    fetchTasks();
    setEditingTask(null);
  };

  return (
    <div>
      <h2>Task List</h2>
      {notification && <Alert variant="success">{notification}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {editingTask ? (
        <TaskForm taskId={editingTask.id} onSuccess={handleSuccess} />
      ) : (
        <>
          <TaskForm onSuccess={handleSuccess} />
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task.id}>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <p>Priority: {task.priority}</p>
                <p>Due Date: {task.due_date}</p>
                <p>Status: {task.completed ? "Completed" : "Not Completed"}</p>
                <Button variant="warning" onClick={() => handleEdit(task)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default TaskList;
