import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import PokeList from "./components/PokeList";
import PokeDetails from "./components/PokeDetails.jsx";
import "./reset.css";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<PokeList path="home" />}></Route>
      <Route path="pokemon/:dexId" element={<PokeDetails />}></Route>
      <Route path="favorites" element={<PokeList path="favorites" />}></Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
