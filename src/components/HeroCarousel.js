import React, { useState, useEffect } from 'react';  
import { motion } from 'framer-motion';  
import { ArrowLeft, ArrowRight } from 'lucide-react';  

const slides = [  
  { image: 'https://via.placeholder.com/1200x600/2563eb/ffffff?text=Banner+1+-+Moda+Azul', title: 'Descubre lo Nuevo', subtitle: 'Estilo Urbano' },  
  { image: 'https://via.placeholder.com/1200x600/f59e0b/000000?text=Banner+2+-+Amarillo+Vibes', title: 'Colores Vibrantes', subtitle: 'Para Ti' },  
  { image: 'https://via.placeholder.com/1200x600/3b82f6/ffffff?text=Banner+3+-+Ropa+Especial', title: 'Ofertas Limitadas', subtitle: '¡Aprovecha!' }  
];  

const HeroCarousel = () => {  
  const [currentSlide, setCurrentSlide] = useState(0);  

  useEffect(() => {  
    const timer = setInterval(() => {  
      setCurrentSlide((prev) => (prev + 1) % slides.length);  
    }, 5000);  
    return () => clearInterval(timer);  
  }, []);  

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);  
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);  

  return (  
    <div className="relative h-96 md:h-[500px] overflow-hidden bg-blue-100 rounded-b-3xl">  
      <motion.div  
        key={currentSlide}  
        initial={{ opacity: 0, x: 100 }}  
        animate={{ opacity: 1, x: 0 }}  
        exit={{ opacity: 0, x: -100 }}  
        transition={{ duration: 0.6 }}  
        className="absolute inset-0 w-full h-full"  
        style={{  
          backgroundImage: `url(${slides[currentSlide].image})`,  
          backgroundSize: 'cover',  
          backgroundPosition: 'center'  
        }}  
      />  

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 via-transparent to-yellow-500/70" />  

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">  
        <motion.h1  
          initial={{ y: 20, opacity: 0 }}  
          animate={{ y: 0, opacity: 1 }}  
          className="text-3xl md:text-5xl font-bold mb-4"  
        >  
          {slides[currentSlide].title}  
        </motion.h1>  
        <motion.p  
          initial={{ y: 20, opacity: 0 }}  
          animate={{ y: 0, opacity: 1 }}  
          transition={{ delay: 0.2 }}  
          className="text-xl md:text-2xl mb-8"  
        >  
          {slides[currentSlide].subtitle}  
        </motion.p>  
        <motion.button  
          whileHover={{ scale: 1.05 }}  
          whileTap={{ scale: 0.95 }}  
          className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-bold text-lg"  
        >  
          Comprar Ahora  
        </motion.button>  
      </div>  

      <button  
        onClick={prevSlide}  
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white"  
      >  
        <ArrowLeft className="w-6 h-6" />  
      </button>  
      <button  
        onClick={nextSlide}  
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white"  
      >  
        <ArrowRight className="w-6 h-6" />  
      </button>  

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">  
        {slides.map((_, index) => (  
          <button  
            key={index}  
            onClick={() => setCurrentSlide(index)}  
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-yellow-500' : 'bg-white/50'}`}  
          />  
        ))}  
      </div>  
    </div>  
  );  
};  

export default HeroCarousel;