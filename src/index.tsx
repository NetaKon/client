import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Lobby from "./pages/lobby/Lobby";
import Room, { loader as roomLoader } from "./pages/room/Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby />,
  },
  {
    path: "/:id",
    element: <Room />,
    loader: roomLoader,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
