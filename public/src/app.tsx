import React from "react";
import { createRoot } from "react-dom/client";

const PublicApp = () => <p>Hello from SpeedPress frontend</p>;

const rootElement = document.getElementById("spwa-public-root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<PublicApp />);
}
