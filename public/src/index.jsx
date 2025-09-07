import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => <h2>Hello from PBWR Public App</h2>;

const root = document.getElementById('spwa-public-root');
if (root) {
  createRoot(root).render(<App />);
}
