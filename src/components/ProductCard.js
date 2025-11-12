import React from 'react';  
import { motion } from 'framer-motion';  
import { Plus } from 'lucide-react';  

const ProductCard = ({ product, onAddToCart, cartItems }) => {  
  const isInCart = cartItems.some(item => item.id === product.id);  

  return (  
    <motion.div  
      whileHover={{ y: -5 }}  
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200/50"  
    >  
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />  
      <div className="p-6">  
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>  
        <p className="text-gray-500 mb-4">{product.category.toUpperCase()}</p>  
        <div className="flex justify-between items-center">  
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>  
          <motion.button  
            whileHover={{ scale: 1.1 }}  
            whileTap={{ scale: 0.9 }}  
            onClick={() => onAddToCart(product)}  
            disabled={isInCart}  
            className={`p-3 rounded-full ${isInCart ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-yellow-500 text-white'}`}  
          >  
            {isInCart ? <Plus className="w-5 h-5 opacity-50" /> : <Plus className="w-5 h-5" />}  
          </motion.button>  
        </div>  
      </div>  
    </motion.div>  
  );  
};  

export default ProductCard;