import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./media.css";
import "./log&reg.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../Component/hooks/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
