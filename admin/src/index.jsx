import React from 'react';
import { createRoot } from 'react-dom/client';

// Import your page components
import Dashboard from './dashboard';

// Create a root element for the Dashboard component
const dashboardRoot = document.getElementById('spwa-admin-root');
createRoot(dashboardRoot).render(<Dashboard />);