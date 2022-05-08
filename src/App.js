import React from "react";
import Home from "./components/Home";
import Chat from "./components/Chat";
import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
    <>
   
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="chat" element={<Chat />} />
            <Route path="/dashboard" element={<AdminDashboard />}></Route>
          </Routes>
    </>
  );
}

export default App;
