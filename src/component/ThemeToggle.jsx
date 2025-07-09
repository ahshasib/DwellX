import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className="btn bg-gradient-to-r from-green-400 to-blue-500 border-none shadow-lg">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggle;