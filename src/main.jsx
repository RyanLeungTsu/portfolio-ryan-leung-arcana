import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AnimProvider } from "./hooks/AnimProvider";
import App from "./App.jsx";
import "./index.css";

// for persisting the theme changes to avoid random mismatches
const savedTheme = localStorage.getItem("theme") || "night";
document.documentElement.setAttribute("data-theme", savedTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimProvider>
        <App />
      </AnimProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
