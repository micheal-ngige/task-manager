import React from "react";
import { Button } from "react-bootstrap"; 
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import TaskList from "./components/TaskList";

const App = () => {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Reload to reset state
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
