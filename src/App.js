import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={<div className="App"><Home /></div>} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
