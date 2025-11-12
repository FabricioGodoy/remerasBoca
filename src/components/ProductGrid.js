import React from 'react';  
import ProductCard from './ProductCard';  
import { products } from '../mock/products';  

const ProductGrid = ({ onAddToCart, cartItems }) => {  
  const categories = [...new Set(products.map(p => p.category))];  

  return (  
    <div className="container mx-auto px-4 py-8">  
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">  
        Nuestros Productos  
      </h2>  
      {categories.map(category => (  
        <div key={category} className="mb-12">  
          <h3 className="text-2xl font-bold mb-6 capitalize text-gray-800">{category}</h3>  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
            {products  
              .filter(p => p.category === category)  
              .map(product => (  
                <ProductCard  
                  key={product.id}  
                  product={product}  
                  onAddToCart={onAddToCart}  
                  cartItems={cartItems}  
                />  
              ))}  
          </div>  
        </div>  
      ))}  
    </div>  
  );  
};  

export default ProductGrid;