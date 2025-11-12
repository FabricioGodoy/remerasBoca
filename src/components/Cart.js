import React from 'react';  
import { motion } from 'framer-motion';  
import { X, Minus, Plus, CreditCard } from 'lucide-react';  
import { useNavigate } from 'react-router-dom';  

// SVG custom inline para ShoppingBag (sin archivo extra para evitar errores de path)  
const ShoppingBagIcon = ({ className }) => (  
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">  
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />  
  </svg>  
);  

const Cart = ({ cartItems, onUpdateCart, onRemoveFromCart, onCheckout }) => {  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);  
  const navigate = useNavigate();  

  if (cartItems.length === 0) {  
    return (  
      <div className="container mx-auto px-4 py-8 text-center">  
        <motion.div  
          initial={{ opacity: 0, scale: 0.8 }}  
          animate={{ opacity: 1, scale: 1 }}  
          className="bg-white rounded-2xl p-12 shadow-lg"  
        >  
          <ShoppingBagIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />  
          <h2 className="text-2xl font-bold mb-4">Carrito Vacío</h2>  
          <button  
            onClick={() => navigate('/')}  
            className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-6 py-3 rounded-full"  
          >  
            Ver Productos  
          </button>  
        </motion.div>  
      </div>  
    );  
  }  

  return (  
    <div className="container mx-auto px-4 py-8">  
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Carrito de Compras</h2>  
      <div className="space-y-4 mb-8">  
        {cartItems.map(item => (  
          <motion.div  
            key={item.id}  
            initial={{ opacity: 0, x: -20 }}  
            animate={{ opacity: 1, x: 0 }}  
            className="bg-white rounded-xl p-6 flex items-center gap-4 border border-gray-200"  
          >  
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />  
            <div className="flex-1">  
              <h3 className="font-bold">{item.name}</h3>  
              <p className="text-gray-500">${item.price}</p>  
            </div>  
            <div className="flex items-center gap-4">  
              <button onClick={() => onUpdateCart(item.id, item.quantity - 1)} className="p-1 text-gray-500 hover:text-blue-600">  
                <Minus className="w-4 h-4" />  
              </button>  
              <span className="font-bold px-4">{item.quantity}</span>  
              <button onClick={() => onUpdateCart(item.id, item.quantity + 1)} className="p-1 text-gray-500 hover:text-blue-600">  
                <Plus className="w-4 h-4" />  
              </button>  
              <button onClick={() => onRemoveFromCart(item.id)} className="p-2 text-red-500 hover:text-red-700">  
                <X className="w-5 h-5" />  
              </button>  
            </div>  
          </motion.div>  
        ))}  
      </div>  
      <div className="bg-white rounded-xl p-6 border border-gray-200">  
        <div className="flex justify-between text-xl font-bold mb-6">  
          <span>Total:</span>  
          <span className="text-blue-600">${total.toFixed(2)}</span>  
        </div>  
        <motion.button  
          whileHover={{ scale: 1.05 }}  
          whileTap={{ scale: 0.95 }}  
          onClick={onCheckout}  
          className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"  
        >  
          <CreditCard className="w-5 h-5" />  
          Proceder al Pago  
        </motion.button>  
        <p className="text-sm text-gray-500 mt-2 text-center">Integración con Mercado Pago próximamente</p>  
      </div>  
    </div>  
  );  
};  

export default Cart;