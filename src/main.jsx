import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Todo_List from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Todo_List />
  </StrictMode>,
);
