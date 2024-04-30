import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./components/Home";
import Test from "./components/Test.jsx";
import "./reset.css";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home text="home" />}></Route>
      <Route
        path="pokemon/:pokemonId"
        element={<Test text="pokemon" />}
      ></Route>
      <Route path="favorites" element={<Test text="favs" />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
