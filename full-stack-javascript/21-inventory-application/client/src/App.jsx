import { Outlet, useLocation } from "react-router-dom";
import { createContext, useState } from "react";
import NavBar from "./components/Nav";

export const DarkModeContext = createContext();
export const UserContext = createContext();

function App() {
  const urlPath = useLocation().pathname.split("/")[1];
  const root = document.getElementById("root");
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const response = await fetch(`http://localhost:3000/users`);

      if (!response.ok) {
        let errorMessage = `Failed to fetch data. Status: ${response.status}`;
        if (response.statusText) {
          errorMessage += `, Message: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  }

  if (!user) {
    fetchUser();
  }

  darkMode ? root.classList.add("dark") : root.classList.remove("dark");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <NavBar route={urlPath} toggleDarkMode={setDarkMode} />
        <Outlet />
      </DarkModeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
