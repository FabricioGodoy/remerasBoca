import React from 'react';  
import { motion } from 'framer-motion';  
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';  

const Footer = () => {  
  return (  
    <motion.footer  
      initial={{ opacity: 0, y: 20 }}  
      whileInView={{ opacity: 1, y: 0 }}  
      className="bg-gradient-to-r from-blue-900 to-yellow-500 text-white py-12 mt-12"  
    >  
      <div className="container mx-auto px-4">  
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">  
          <div className="col-span-1 md:col-span-2">  
            <h3 className="text-2xl font-bold mb-4 bg-white/20 px-2 rounded">RopaVibes</h3>  
            <p className="text-blue-100 mb-4">Tu tienda de ropa urbana con estilo Vans, pero en azul y amarillo. ¡Compra con confianza!</p>  
            <div className="flex space-x-4">  
              <a href="#" className="p-2 hover:bg-white/20 rounded-full"><Instagram className="w-5 h-5" /></a>  
              <a href="#" className="p-2 hover:bg-white/20 rounded-full"><Twitter className="w-5 h-5" /></a>  
              <a href="#" className="p-2 hover:bg-white/20 rounded-full"><Facebook className="w-5 h-5" /></a>  
            </div>  
          </div>  
          <div>  
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>  
            <ul className="space-y-2 text-sm">  
              <li><a href="/" className="hover:underline">Inicio</a></li>  
              <li><a href="/products" className="hover:underline">Productos</a></li>  
              <li><a href="/cart" className="hover:underline">Carrito</a></li>  
              <li><a href="/login" className="hover:underline">Cuenta</a></li>  
            </ul>  
          </div>  
          <div>  
            <h4 className="font-bold mb-4">Contacto</h4>  
            <div className="space-y-2 text-sm">  
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@ropavibes.com</p>  
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 234 567 890</p>  
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Calle Falsa 123</p>  
            </div>  
          </div>  
        </div>  
        <div className="border-t border-white/20 pt-6 text-center text-sm text-blue-100">  
          <p>&copy; 2024 RopaVibes. Todos los derechos reservados. | Política de Privacidad | Términos de Servicio</p>  
        </div>  
      </div>  
    </motion.footer>  
  );  
};  

export default Footer;