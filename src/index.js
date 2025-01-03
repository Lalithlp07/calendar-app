import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this file contains the Tailwind directives
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';

// Create the root element for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Log performance metrics or send to an analytics endpoint
reportWebVitals();
