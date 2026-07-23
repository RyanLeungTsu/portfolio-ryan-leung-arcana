import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

function getInitialTheme() {
  if (typeof document === "undefined") return "night";
  return document.documentElement.dataset.theme || "night";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeState(document.documentElement.dataset.theme || "night");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const setTheme = (next) => {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDay: theme === "day" }}>
      {children}
    </ThemeContext.Provider>
  );
}