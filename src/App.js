import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfessorsList from "./components/ProfessorsList";
import StudentsList from "./components/StudentsList";
import RequestsList from "./components/RequestsList";
import Chat from "./components/Chat";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={<div className="App"><Home /></div>} />
        <Route path="chat" element={<Chat />} />
        <Route path="professors" element={<ProfessorsList />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="requests" element={<RequestsList />} />
        <Route path="profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
