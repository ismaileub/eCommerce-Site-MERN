import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Router";
import AuthProviders from "./Providers/AuthProviders";
import { Toaster } from "react-hot-toast";
import CartProviders from "./Providers/CartProviders";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProviders>
      <CartProviders>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </CartProviders>
    </AuthProviders>
  </React.StrictMode>,
);
