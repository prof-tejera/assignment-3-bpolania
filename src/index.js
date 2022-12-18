import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { TimersContextProvider } from "./components/contexts/TimersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TimersContextProvider>
      <App />
    </TimersContextProvider>
  </React.StrictMode>
);
