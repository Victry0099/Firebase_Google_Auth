import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, } from "react-router-dom"


function App() {


  return (

    <>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
   </Router>
  
    </>
  )
}

export default App
