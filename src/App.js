import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import StorePage from './pages/StorePage';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import './global.css';
import './components/Navbar.css';
import './components/Footer.css';
import './pages/CartPage.css';
import './pages/StorePage.css';
import './pages/ProductDetailPage.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="676877569274-73q4b85k0nkvk46j7qrge97de6vm3v5f.apps.googleusercontent.com">
      <AuthProvider>
        <CartProvider>
          <div className="app-container">
            <Navbar />
            <div className="content-container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </div>
            <Footer />
            <FloatingWhatsApp
              phoneNumber="990675577"
              accountName="Soporte al Cliente"
              allowClickAway
              notification
              notificationSound
              avatar="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              statusMessage="Normalmente responde dentro de una hora"
              chatMessage="¡Hola! ¿Cómo podemos ayudarte hoy?"
            />
            <ToastContainer />
          </div>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
