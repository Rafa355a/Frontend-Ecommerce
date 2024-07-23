import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './global.css'; // Importar el archivo CSS global
import './components/Navbar.css';
import './components/Footer.css';
import './pages/CartPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const clientId = "676877569274-73q4b85k0nkvk46j7qrge97de6vm3v5f.apps.googleusercontent.com";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
