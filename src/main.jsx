import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AddProvider from "./Context/AddContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AddProvider>
      <App />
    </AddProvider>
  </StrictMode>
);
