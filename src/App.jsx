// import { useState } from 'react'
// Pages
import Home from "./pages/home.jsx";
import ProjectPage from "./pages/projectPage.jsx";
// Components
import './App.css'

function App() {
  
  return (
    <div>
      <AppRoutes />
    </div>
  )
}

  function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:projectId" element={<ProjectPage />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

 

export default App
