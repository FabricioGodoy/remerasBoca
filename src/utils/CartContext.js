import React, { createContext, useState, useContext } from 'react';  
import { products } from '../mock/products';  
import { mockUsers } from '../mock/users';  

const CartContext = createContext();  

export const useCart = () => useContext(CartContext);  

export const CartProvider = ({ children }) => {  
  const [cartItems, setCartItems] = useState([]);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [currentUser, setCurrentUser] = useState(null); // Agregar user actual con rol  

  const addToCart = (product) => {  
    if (!isLoggedIn) {  
      alert('Debes iniciar sesión para agregar al carrito');  
      return;  
    }  
    setCartItems(prev => {  
      const existing = prev.find(item => item.id === product.id);  
      if (existing) {  
        return prev.map(item =>  
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item  
        );  
      }  
      return [...prev, { ...product, quantity: 1 }];  
    });  
  };  

  const updateCart = (id, quantity) => {  
    if (quantity <= 0) {  
      removeFromCart(id);  
      return;  
    }  
    setCartItems(prev =>  
      prev.map(item => (item.id === id ? { ...item, quantity } : item))  
    );  
  };  

  const removeFromCart = (id) => {  
    setCartItems(prev => prev.filter(item => item.id !== id));  
  };  

  const login = (email, password) => {  
    const user = mockUsers.find(u => u.email === email && u.password === password);  
    if (user) {  
      setCurrentUser(user);  
      setIsLoggedIn(true);  
      return true;  
    }  
    return false;  
  };  

  const logout = () => {  
    setIsLoggedIn(false);  
    setCurrentUser(null);  
    setCartItems([]);  
  };  

  const completePurchase = () => {  
    if (!isLoggedIn) return false;  
    setCartItems([]);  
    alert(`¡Compra completada para ${currentUser.name}! (Mock)`);  
    return true;  
  };  

  return (  
    <CartContext.Provider value={{  
      cartItems,  
      addToCart,  
      updateCart,  
      removeFromCart,  
      isLoggedIn,  
      currentUser,  
      login,  
      logout,  
      completePurchase  
    }}>  
      {children}  
    </CartContext.Provider>  
  );  
};