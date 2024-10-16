import React from 'react';
import ReactDOM from 'react-dom/client'; /* Importing the modern ReactDOM method */
import './index.css'; /* Importing global styles */
import App from './App'; /* Importing the main App component */

/* Creating the root of the React app and attaching it to the 'root' div in the public/index.html file */
const root = ReactDOM.createRoot(document.getElementById('root'));

/* Rendering the App component inside React.StrictMode for improved development practices */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
