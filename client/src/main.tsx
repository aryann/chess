import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { clarity } from "react-microsoft-clarity";
import { App } from "./App";

clarity.init("ob552iy56o");
clarity.consent();
clarity.upgrade("all");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
