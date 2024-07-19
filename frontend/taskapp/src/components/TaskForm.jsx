import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { Form, Button } from "react-bootstrap";

const TaskForm = ({ taskId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);

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
          console.error(err);
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
        onSuccess();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
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
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
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
        <Form.Check
          type="checkbox"
          label="Completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {taskId ? "Update Task" : "Create Task"}
      </Button>
    </Form>
  );
};

export default TaskForm;
