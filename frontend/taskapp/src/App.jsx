import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import TaskList from "./components/TaskList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
