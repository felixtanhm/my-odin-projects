import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Nav";

function App() {
  const urlPath = useLocation().pathname.split("/")[1];

  return (
    <>
      <div>
        <NavBar route={urlPath} />
        <Outlet />
        <p>App is rendered</p>
      </div>
    </>
  );
}

export default App;
