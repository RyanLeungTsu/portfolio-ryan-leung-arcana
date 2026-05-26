// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
// Pages
import Home from "./pages/home.jsx";
import ProjectPage from "./pages/projectPage.jsx";
// Components
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:projectId" element={<ProjectPage />} />
    </Routes>
  )
}
 

export default App
