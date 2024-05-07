import { Outlet, useLocation } from "react-router-dom";
import { createContext, useState } from "react";
import NavBar from "./components/Nav";

export const DarkModeContext = createContext();

function App() {
  const urlPath = useLocation().pathname.split("/")[1];
  const root = document.getElementById("root");
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  darkMode ? root.classList.add("dark") : root.classList.remove("dark");

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <NavBar route={urlPath} toggleDarkMode={setDarkMode} />
      <Outlet />
    </DarkModeContext.Provider>
  );
}

export default App;
