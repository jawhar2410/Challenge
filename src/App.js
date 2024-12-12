import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetail';
import CustomNavbar from './pages/navbar';
import Login from './pages/login';
import Cart from './pages/cart';
import Signup from './pages/signup';


const App = () => {
    return (
        <Router>
          <CustomNavbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            
              <footer className="text-center py-4 bg-dark text-white mt-5">
                <>
                    <p>&copy; 2024 Notre Boutique. Tous droits réservés.</p>
                    <p>Contactez-nous: JOEProducts@Products.com</p>
                </>
            </footer>
        </Router>
    );
};

export default App;
