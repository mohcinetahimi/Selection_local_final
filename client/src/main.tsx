import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext'; // Import the ProductProvider

import App from './App';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <App />
      </ProductProvider>

    </Router>
  </React.StrictMode>,
);
