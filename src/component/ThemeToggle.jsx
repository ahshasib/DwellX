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
    <button
      onClick={toggleTheme}
      className="btn-sm rounded-full p-2 border-none bg-indigo-600 shadow-lg"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        // 🌙 Moon Icon
        <svg
          aria-label="moon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </g>
        </svg>
      ) : (
        // ☀️ Sun Icon
        <svg
          aria-label="sun"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </g>
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;
