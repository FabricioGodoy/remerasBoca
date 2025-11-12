import React, { useState, useEffect } from 'react';  
import { motion } from 'framer-motion';  
import { User, Mail, Lock, Check, X } from 'lucide-react';  
import { useNavigate } from 'react-router-dom';  
import { useCart } from '../utils/CartContext';  

const Login = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [isLogin, setIsLogin] = useState(true);  
  const [error, setError] = useState('');  
  const [isLoading, setIsLoading] = useState(false);  
  const { login: contextLogin, isLoggedIn } = useCart();  
  const navigate = useNavigate();  

  useEffect(() => {  
    if (isLoggedIn) {  
      navigate('/');  
    }  
  }, [isLoggedIn, navigate]);  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    if (!email || !password) {  
      setError('Completa email y contraseña');  
      return;  
    }  
    setError('');  
    setIsLoading(true);  
    // Simular delay para feel real  
    setTimeout(() => {  
      const success = contextLogin(email, password);  
      if (success) {  
        setIsLoading(false);  
        navigate('/');  
      } else {  
        setIsLoading(false);  
        setError('Credenciales inválidas. Prueba: admin@ropavibes.com / admin123 (admin) o user@ropavibes.com / user123 (user)');  
      }  
    }, 800);  
  };  

  const handleRegister = (e) => {  
    e.preventDefault();  
    setError('Registro mock: Crea cuenta falsa, pero usa login con credenciales predefinidas para acceso real (simulado).');  
    setIsLogin(true); // Volver a login después  
  };  

  if (isLoading) {  
    return (  
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50 py-8">  
        <motion.div  
          initial={{ scale: 0.8 }}  
          animate={{ scale: 1 }}  
          className="text-center"  
        >  
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>  
          <p className="text-gray-600">Validando...</p>  
        </motion.div>  
      </div>  
    );  
  }  

  return (  
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50 py-8">  
      <motion.div  
        initial={{ opacity: 0, scale: 0.8 }}  
        animate={{ opacity: 1, scale: 1 }}  
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-gray-200"  
      >  
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">  
          {isLogin ? 'Inicia Sesión' : 'Regístrate'}  
        </h2>  
        {error && (  
          <motion.div  
            initial={{ opacity: 0, y: -10 }}  
            animate={{ opacity: 1, y: 0 }}  
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2"  
          >  
            <X className="w-4 h-4 flex-shrink-0" />  
            <span className="text-sm">{error}</span>  
          </motion.div>  
        )}  
        <form onSubmit={isLogin ? handleSubmit : handleRegister} className="space-y-4">  
          {!isLogin && (  
            <div>  
              <label className="block text-sm font-medium mb-1">Nombre</label>  
              <div className="relative">  
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />  
                <input  
                  type="text"  
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
                  placeholder="Tu nombre"  
                  disabled // Mock, no guarda  
                />  
              </div>  
            </div>  
          )}  
          <div>  
            <label className="block text-sm font-medium mb-1">Email</label>  
            <div className="relative">  
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />  
              <input  
                type="email"  
                value={email}  
                onChange={(e) => setEmail(e.target.value)}  
                required  
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
                placeholder="Email"  
              />  
            </div>  
          </div>  
          <div>  
            <label className="block text-sm font-medium mb-1">Contraseña</label>  
            <div className="relative">  
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />  
              <input  
                type="password"  
                value={password}  
                onChange={(e) => setPassword(e.target.value)}  
                required  
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
                placeholder="Contraseña"  
              />  
            </div>  
          </div>  
          <motion.button  
            whileHover={{ scale: 1.02 }}  
            whileTap={{ scale: 0.98 }}  
            type="submit"  
            disabled={isLoading}  
            className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"  
          >  
            <Check className="w-5 h-5" />  
            {isLogin ? 'Entrar' : 'Registrarse (Mock)'}  
          </motion.button>  
        </form>  
        <p className="text-center mt-4 text-gray-500">  
          {isLogin ? '¿Nuevo aquí? ' : '¿Ya tienes cuenta? '}  
          <button  
            type="button"  
            onClick={() => { setIsLogin(!isLogin); setError(''); }}  
            className="text-blue-600 hover:underline font-medium"  
          >  
            {isLogin ? 'Crea una cuenta' : 'Inicia sesión'}  
          </button>  
        </p>  
      </motion.div>  
    </div>  
  );  
};  

export default Login;