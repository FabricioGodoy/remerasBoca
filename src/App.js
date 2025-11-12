import React from 'react';  
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';  
import { CartProvider, useCart } from './utils/CartContext';  
import Navbar from './components/Navbar';  
import HeroCarousel from './components/HeroCarousel';  
import ProductGrid from './components/ProductGrid';  
import Cart from './components/Cart';  
import Login from './components/Login';  
import Checkout from './components/Checkout';  
import Dashboard from './components/Dashboard';  
import Footer from './components/Footer';  

function Home() {  
  const { addToCart, cartItems, isLoggedIn, currentUser } = useCart();  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex flex-col">  
      <Navbar cartCount={cartItems.length} isLoggedIn={isLoggedIn} currentUser={currentUser} />  
      <HeroCarousel />  
      <ProductGrid onAddToCart={addToCart} cartItems={cartItems} />  
      <Footer />  
    </div>  
  );  
}  

function Products() {  
  const { addToCart, cartItems, isLoggedIn, currentUser } = useCart();  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex flex-col pt-20">  
      <Navbar cartCount={cartItems.length} isLoggedIn={isLoggedIn} currentUser={currentUser} />  
      <ProductGrid onAddToCart={addToCart} cartItems={cartItems} />  
      <Footer />  
    </div>  
  );  
}  

function CartPage() {  
  const { cartItems, updateCart, removeFromCart, isLoggedIn, currentUser } = useCart();  
  const navigate = useNavigate();  

  const handleCheckout = () => {  
    if (!isLoggedIn) {  
      navigate('/login');  
      return;  
    }  
    navigate('/checkout');  
  };  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex flex-col pt-20">  
      <Navbar cartCount={cartItems.length} isLoggedIn={isLoggedIn} currentUser={currentUser} />  
      <Cart  
        cartItems={cartItems}  
        onUpdateCart={updateCart}  
        onRemoveFromCart={removeFromCart}  
        onCheckout={handleCheckout}  
      />  
      <Footer />  
    </div>  
  );  
}  

function LoginPage() {  
  const { isLoggedIn, currentUser } = useCart();  

  if (isLoggedIn) return <Navigate to="/" />;  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex flex-col">  
      <Navbar cartCount={0} isLoggedIn={false} currentUser={null} />  
      <Login />  
      <Footer />  
    </div>  
  );  
}  

function CheckoutPage() {  
  const { cartItems, completePurchase, isLoggedIn, currentUser } = useCart();  
  const navigate = useNavigate();  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);  

  if (total === 0) return <Navigate to="/cart" />;  
  if (!isLoggedIn) return <Navigate to="/login" />;  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex flex-col pt-20">  
      <Navbar cartCount={cartItems.length} isLoggedIn={isLoggedIn} currentUser={currentUser} />  
      <Checkout total={total} onCompletePurchase={completePurchase} />  
      <Footer />  
    </div>  
  );  
}  

function DashboardPage() {  
  const { isLoggedIn, currentUser } = useCart();  
  const navigate = useNavigate();  

  if (!isLoggedIn || currentUser?.role !== 'admin') {  
    alert('Acceso denegado. Solo admins (usa admin@ropavibes.com / admin123).');  
    navigate('/');  
    return <Navigate to="/" />;  
  }  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex flex-col pt-20">  
      <Navbar cartCount={0} isLoggedIn={isLoggedIn} currentUser={currentUser} />  
      <Dashboard />  
      <Footer />  
    </div>  
  );  
}  

function App() {  
  return (  
    <CartProvider>  
      <Router>  
        <Routes>  
          <Route path="/" element={<Home />} />  
          <Route path="/products" element={<Products />} />  
          <Route path="/cart" element={<CartPage />} />  
          <Route path="/login" element={<LoginPage />} />  
          <Route path="/checkout" element={<CheckoutPage />} />  
          <Route path="/dashboard" element={<DashboardPage />} />  
        </Routes>  
      </Router>  
    </CartProvider>  
  );  
}  

export default App;