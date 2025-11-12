import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { CreditCard, CheckCircle } from 'lucide-react';  
import { useNavigate } from 'react-router-dom';  

const Checkout = ({ total, onCompletePurchase }) => {  
  const [paymentMethod, setPaymentMethod] = useState('mp'); // Mock for MP  
  const [isProcessing, setIsProcessing] = useState(false);  
  const navigate = useNavigate();  

  const handlePayment = () => {  
    setIsProcessing(true);  
    setTimeout(() => {  
      onCompletePurchase();  
      setIsProcessing(false);  
      navigate('/');  
      alert('¡Pago simulado exitoso! Integra Mercado Pago aquí.');  
    }, 2000);  
  };  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-8">  
      <div className="container mx-auto px-4 max-w-md">  
        <motion.div  
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}  
          className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"  
        >  
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Finalizar Compra</h2>  
          <div className="space-y-4 mb-6">  
            <div className="flex justify-between">  
              <span>Total:</span>  
              <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>  
            </div>  
            <label className="block text-sm font-medium mb-2">Método de Pago</label>  
            <div className="space-y-2">  
              <label className="flex items-center cursor-pointer">  
                <input  
                  type="radio"  
                  value="mp"  
                  checked={paymentMethod === 'mp'}  
                  onChange={(e) => setPaymentMethod(e.target.value)}  
                  className="mr-2"  
                />  
                <CreditCard className="w-4 h-4 mr-2" /> Mercado Pago (Mock)  
              </label>  
            </div>  
          </div>  
          <motion.button  
            whileHover={{ scale: 1.02 }}  
            whileTap={{ scale: 0.98 }}  
            onClick={handlePayment}  
            disabled={isProcessing}  
            className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"  
          >  
            {isProcessing ? (  
              <>Procesando...</>  
            ) : (  
              <>  
                <CreditCard className="w-5 h-5" /> Pagar Ahora  
              </>  
            )}  
          </motion.button>  
          <p className="text-xs text-gray-500 mt-4 text-center">Esto es un mock. Integra tu pasarela real aquí.</p>  
        </motion.div>  
      </div>  
    </div>  
  );  
};  

export default Checkout;