import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Button, Alert } from "react-bootstrap";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then((response) => {
        setTasks(response.data);
        setError("");
      })
      .catch(() => setError("Failed to load tasks."));
  }, [success]); // Re-fetch tasks when success changes

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${taskId}/`)
      .then(() => {
        setSuccess("Task deleted successfully!");
        setError("");
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch(() => setError("Failed to delete task."));
  };

  const handleSuccess = () => {
    setEditingTask(null);
    setSuccess("Task saved successfully!");
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <h2>Task List</h2>
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
