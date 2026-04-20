import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Router";
import AuthProviders from "./Providers/AuthProviders";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProviders>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </AuthProviders>
  </React.StrictMode>,
);
