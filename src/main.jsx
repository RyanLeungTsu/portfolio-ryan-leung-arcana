import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AnimProvider } from "./hooks/animProvider";
import { ThemeProvider } from "./hooks/themeProvider";
import App from "./App.jsx";
import "./index.css";

// for persisting the theme changes to avoid random mismatches
const VALID_THEMES = ["day", "night"];
const storedTheme = localStorage.getItem("theme");
const savedTheme = VALID_THEMES.includes(storedTheme) ? storedTheme : "night";
document.documentElement.setAttribute("data-theme", savedTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AnimProvider>
          <App />
        </AnimProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);