import React, { useState, useRef, useEffect } from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { Search, User, Menu, X, LogOut, Settings } from 'lucide-react';  
import { Link, useNavigate } from 'react-router-dom';  
import { useCart } from '../utils/CartContext';  

const ShoppingBagIcon = ({ className }) => (  
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">  
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />  
  </svg>  
);  

const Navbar = ({ cartCount, isLoggedIn, currentUser }) => {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);  
  const [isMobileUserOpen, setIsMobileUserOpen] = useState(false);  
  const navigate = useNavigate();  
  const { logout } = useCart();  
  const dropdownRef = useRef(null);  

  // Cerrar dropdown si click fuera  
  useEffect(() => {  
    const handleClickOutside = (event) => {  
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {  
        setIsUserDropdownOpen(false);  
      }  
    };  
    document.addEventListener('mousedown', handleClickOutside);  
    return () => document.removeEventListener('mousedown', handleClickOutside);  
  }, []);  

  const handleUserClick = () => {  
    if (!isLoggedIn) {  
      setIsUserDropdownOpen(false);  
      navigate('/login');  
      return;  
    }  
    setIsUserDropdownOpen(!isUserDropdownOpen);  
  };  

  const handleLogout = () => {  
    if (confirm(`¿Cerrar sesión de ${currentUser?.name || 'Usuario'}?`)) {  
      logout();  
      setIsUserDropdownOpen(false);  
      setIsMobileUserOpen(false);  
      setIsMenuOpen(false);  
      navigate('/');  
    }  
  };  

  const handleMobileUserToggle = () => {  
    setIsMobileUserOpen(!isMobileUserOpen);  
  };  

  const handleMobileLogout = () => {  
    if (confirm(`¿Cerrar sesión de ${currentUser?.name || 'Usuario'}?`)) {  
      logout();  
      setIsMobileUserOpen(false);  
      setIsMenuOpen(false);  
      navigate('/');  
    }  
  };  

  return (  
    <motion.nav  
      initial={{ y: -100 }}  
      animate={{ y: 0 }}  
      className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50"  
    >  
      <div className="container mx-auto px-4 py-4">  
        <div className="flex items-center justify-between">  
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">RopaVibes</Link>  

          <div className="hidden md:flex items-center gap-6">  
            <div className="relative flex-1 max-w-md">  
              <input  
                type="text"  
                placeholder="Buscar prenda..."  
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"  
              />  
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />  
            </div>  

            <Link to="/products" className="hover:text-blue-600">Productos</Link>  

            {isLoggedIn && currentUser?.role === 'admin' && (  
              <Link to="/dashboard" className="hover:text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium">Admin Dashboard</Link>  
            )}  

            <div className="relative" ref={dropdownRef}>  
              <motion.button  
                onClick={handleUserClick}  
                className="p-2 hover:bg-blue-50 rounded-full relative"  
                whileHover={{ scale: 1.05 }}  
                whileTap={{ scale: 0.95 }}  
              >  
                <User className="w-5 h-5 text-blue-600" />  
                {isLoggedIn && (  
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">  
                    {currentUser?.role === 'admin' ? 'A' : 'U'}  
                  </span>  
                )}  
              </motion.button>  

              <AnimatePresence>  
                {isUserDropdownOpen && isLoggedIn && (  
                  <motion.div  
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}  
                    animate={{ opacity: 1, scale: 1, y: 0 }}  
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}  
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50"  
                  >  
                    <div className="px-4 py-3 border-b border-gray-100">  
                      <p className="text-sm font-medium text-gray-900">¡Hola, {currentUser?.name || 'Usuario'}!</p>  
                      <p className="text-xs text-gray-500">Rol: {currentUser?.role}</p>  
                    </div>  
                    <Link  
                      to="/profile" // Placeholder, redirige a home o crea página después  
                      onClick={() => setIsUserDropdownOpen(false)}  
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 w-full"  
                    >  
                      <Settings className="w-4 h-4" /> Mi Cuenta  
                    </Link>  
                    {currentUser?.role === 'admin' && (  
                      <Link  
                        to="/dashboard"  
                        onClick={() => setIsUserDropdownOpen(false)}  
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 w-full"  
                      >  
                        <Settings className="w-4 h-4" /> Dashboard  
                      </Link>  
                    )}  
                    <button  
                      onClick={handleLogout}  
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-50 text-red-600 w-full"  
                    >  
                      <LogOut className="w-4 h-4" /> Cerrar Sesión  
                    </button>  
                  </motion.div>  
                )}  
              </AnimatePresence>  
            </div>  

            <Link to="/cart" className="relative p-2 hover:bg-yellow-50 rounded-full">  
              <ShoppingBagIcon className="w-5 h-5 text-yellow-600" />  
              {cartCount > 0 && (  
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">  
                  {cartCount}  
                </span>  
              )}  
            </Link>  
          </div>  

          <button  
            onClick={() => setIsMenuOpen(!isMenuOpen)}  
            className="md:hidden p-2"  
          >  
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}  
          </button>  
        </div>  

        <AnimatePresence>  
          {isMenuOpen && (  
            <motion.div  
              initial={{ opacity: 0, height: 0 }}  
              animate={{ opacity: 1, height: 'auto' }}  
              exit={{ opacity: 0, height: 0 }}  
              className="md:hidden mt-4 space-y-2 pb-4"  
            >  
              <div className="relative">  
                <input  
                  type="text"  
                  placeholder="Buscar prenda..."  
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"  
                />  
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />  
              </div>  
              <Link to="/products" className="block py-2 hover:text-blue-600">Productos</Link>  
              {isLoggedIn && currentUser?.role === 'admin' && (  
                <Link to="/dashboard" className="block py-2 hover:text-yellow-600" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>  
              )}  
              <button onClick={handleMobileUserToggle} className="block py-2 text-left hover:text-blue-600 w-full text-left flex items-center gap-3">  
                <User className="w-4 h-4" /> {isLoggedIn ? currentUser?.name : 'Iniciar Sesión'}  
              </button>  
              <AnimatePresence>  
                {isMobileUserOpen && isLoggedIn && (  
                  <motion.div  
                    initial={{ opacity: 0, height: 0 }}  
                    animate={{ opacity: 1, height: 'auto' }}  
                    exit={{ opacity: 0, height: 0 }}  
                    className="space-y-2 pl-6 border-l-2 border-blue-200"  
                  >  
                    <Link  
                      to="/profile"  
                      onClick={() => { setIsMobileUserOpen(false); setIsMenuOpen(false); }}  
                      className="block py-2 text-sm hover:text-blue-600"  
                    >Mi Cuenta</Link>  
                    {currentUser?.role === 'admin' && (  
                      <Link  
                        to="/dashboard"  
                        onClick={() => { setIsMobileUserOpen(false); setIsMenuOpen(false); }}  
                        className="block py-2 text-sm hover:text-yellow-600"  
                      >Dashboard</Link>  
                    )}  
                    <button  
                      onClick={handleMobileLogout}  
                      className="block py-2 text-left text-sm hover:text-red-600 w-full text-left"  
                    >Cerrar Sesión</button>  
                  </motion.div>  
                )}  
              </AnimatePresence>  
              <Link to="/cart" className="block py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Carrito ({cartCount})</Link>  
            </motion.div>  
          )}  
        </AnimatePresence>  
      </div>  
    </motion.nav>  
  );  
};  

export default Navbar;