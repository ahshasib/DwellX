function App() {
  const toggleDark = () => {
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");
    html.setAttribute("data-theme", theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content flex flex-col items-center justify-center">
      <button className="btn btn-primary" onClick={toggleDark}>
        Toggle Theme
      </button>
      <h1 className="text-2xl mt-4 text-red-400">Welcome to DaisyUI Dark Mode</h1>
    </div>
  );
}

export default App;
