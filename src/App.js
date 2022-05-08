import React from "react";
// import {Router, Route} from "react-router";
import Home from "./components/Home";
import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
    <>
            {/* <Header/> */}
   
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/dashboard" element={<AdminDashboard />}></Route>
          </Routes>
    </>
  );
}

export default App;
