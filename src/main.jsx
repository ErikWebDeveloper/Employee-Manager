import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnBoardPage from "./pages/OnBoardPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "sign-up", element: <SignUpPage /> },
      { path: "on-board", element: <OnBoardPage /> },
      { path: "history", element: <HistoryPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
