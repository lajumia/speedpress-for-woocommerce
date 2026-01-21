import React from "react";
import { createRoot } from "react-dom/client";
import AdminApp from "./admin";


const rootElement = document.getElementById("spwa-admin-root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<AdminApp />);
}
