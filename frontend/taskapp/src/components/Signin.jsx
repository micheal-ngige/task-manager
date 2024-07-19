import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/token/", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.access); // Save the token
        onSuccess();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </Form>
  );
};

export default SignIn;
