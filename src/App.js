import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfessorsList from "./components/students/ProfessorsList";
import StudentsList from "./components/professors/StudentsList";
import RequestsList from "./components/professors/RequestsList";
import Chat from "./components/Chat";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="chat" element={<Chat />} />
        <Route path="professors" element={<ProfessorsList />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="requests" element={<RequestsList />} />
        <Route path="profile" element={<EditProfile />} />
        <Route path="/dashboard" element={<AdminDashboard />}></Route>
      </Routes>
  );
}

export default App;
