import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const TaskForm = ({ taskId, onSuccess, onFailure }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState("not_completed");
  const [message, setMessage] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:8000/api",
  });

  
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No token found in localStorage.");
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    if (taskId) {
      api
        .get(`/tasks/${taskId}/`)
        .then((response) => {
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setPriority(task.priority);
          setDueDate(task.due_date);
          setCompleted(task.completed);
        })
        .catch((err) => {
          console.error(
            "Failed to fetch task:",
            err.response ? err.response.data : err.message
          );
        });
    }
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      priority,
      due_date: dueDate,
      completed,
    };

    const apiCall = taskId
      ? api.put(`/tasks/${taskId}/`, taskData)
      : api.post("/tasks/", taskData);

    apiCall
      .then(() => {
        setMessage(
          taskId ? "Task updated successfully." : "Task created successfully."
        );
        onSuccess();
      })
      .catch((err) => {
        console.error(
          "Failed to submit task:",
          err.response ? err.response.data : err.message
        );
        setMessage("Failed to submit task. Please try again.");
        onFailure();
      });
  };

  return (
    <>
      {message && (
        <Alert variant={message.includes("Failed") ? "danger" : "success"}>
          {message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="completed">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
          >
            <option value="not_completed">Not Completed</option>
            <option value="completed">Completed</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {taskId ? "Update Task" : "Create Task"}
        </Button>
      </Form>
    </>
  );
};

export default TaskForm;
