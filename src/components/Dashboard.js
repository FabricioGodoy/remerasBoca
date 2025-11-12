import React, { useState, useEffect } from 'react';  
import { motion } from 'framer-motion';  
import { Plus, Edit, Trash, User, Download, BarChart3, Users, DollarSign, X } from 'lucide-react';  
import { products } from '../mock/products';  
import { useCart } from '../utils/CartContext';  

const Dashboard = () => {  
  const { currentUser } = useCart();  
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', category: 'hombres' });  
  const [managedProducts, setManagedProducts] = useState([...products]);  
  const [editingProduct, setEditingProduct] = useState(null); // Estado para editar  
  const [editForm, setEditForm] = useState({ name: '', price: '', image: '', category: 'hombres' });  
  const [stats, setStats] = useState({ totalProducts: 0, totalSales: 0, totalUsers: 2 });  

  useEffect(() => {  
    setStats({ totalProducts: managedProducts.length, totalSales: 1500, totalUsers: Math.floor(Math.random() * 100) + 50 });  
  }, [managedProducts]);  

  const handleAddProduct = (e) => {  
    e.preventDefault();  
    if (newProduct.name && newProduct.price) {  
      const added = {  
        ...newProduct,  
        id: Date.now(),  
        price: parseFloat(newProduct.price),  
        color: newProduct.category === 'hombres' ? 'azul' : 'amarillo'  
      };  
      setManagedProducts(prev => [added, ...prev]);  
      setNewProduct({ name: '', price: '', image: '', category: 'hombres' });  
      alert('¡Producto agregado!');  
    }  
  };  

  const handleEdit = (product) => {  
    setEditingProduct(product.id);  
    setEditForm({  
      name: product.name,  
      price: product.price.toString(),  
      image: product.image || '',  
      category: product.category  
    });  
  };  

  const handleSaveEdit = () => {  
    if (editForm.name && editForm.price) {  
      setManagedProducts(prev =>  
        prev.map(p =>  
          p.id === editingProduct  
            ? { ...p, ...editForm, price: parseFloat(editForm.price) }  
            : p  
        )  
      );  
      setEditingProduct(null);  
      setEditForm({ name: '', price: '', image: '', category: 'hombres' });  
      alert('¡Cambios guardados!');  
    } else {  
      alert('Completa nombre y precio');  
    }  
  };  

  const handleCancelEdit = () => {  
    setEditingProduct(null);  
    setEditForm({ name: '', price: '', image: '', category: 'hombres' });  
  };  

  const handleDelete = (id) => {  
    if (confirm('¿Eliminar este producto?')) {  
      setManagedProducts(prev => prev.filter(p => p.id !== id));  
      if (editingProduct === id) {  
        setEditingProduct(null);  
      }  
      alert('¡Eliminado!');  
    }  
  };  

  const handleExport = () => {  
    const dataStr = JSON.stringify(managedProducts, null, 2);  
    const dataBlob = new Blob([dataStr], { type: 'application/json' });  
    const url = URL.createObjectURL(dataBlob);  
    const link = document.createElement('a');  
    link.href = url;  
    link.download = 'productos-backup.json';  
    link.click();  
    URL.revokeObjectURL(url);  
    alert('¡Datos exportados!');  
  };  

  if (editingProduct) {  
    const product = managedProducts.find(p => p.id === editingProduct);  
    return (  
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8">  
        <div className="container mx-auto px-4">  
          <motion.div  
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
            className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-200 max-w-2xl mx-auto"  
          >  
            <div className="flex items-center justify-between mb-6">  
              <h2 className="text-2xl font-bold text-gray-800">Editando: {product.name}</h2>  
              <button onClick={handleCancelEdit} className="p-2 text-gray-500 hover:text-gray-700">  
                <X className="w-5 h-5" />  
              </button>  
            </div>  
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">  
              <input  
                type="text"  
                placeholder="Nombre"  
                value={editForm.name}  
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}  
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
                required  
              />  
              <input  
                type="number"  
                placeholder="Precio ($)"  
                value={editForm.price}  
                onChange={(e) => setEditForm({...editForm, price: e.target.value})}  
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
                required  
              />  
              <input  
                type="url"  
                placeholder="URL de imagen"  
                value={editForm.image}  
                onChange={(e) => setEditForm({...editForm, image: e.target.value})}  
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"  
              />  
              <select  
                value={editForm.category}  
                onChange={(e) => setEditForm({...editForm, category: e.target.value})}  
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"  
              >  
                <option value="hombres">Hombres</option>  
                <option value="mujeres">Mujeres</option>  
                <option value="zapatos">Zapatos</option>  
              </select>  
              <div className="md:col-span-2 flex gap-4 pt-4">  
                <motion.button  
                  whileHover={{ scale: 1.05 }}  
                  onClick={handleSaveEdit}  
                  className="flex-1 bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"  
                >  
                  <Edit className="w-5 h-5" /> Guardar Cambios  
                </motion.button>  
                <button  
                  onClick={handleCancelEdit}  
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-bold hover:bg-gray-600"  
                >  
                  Cancelar  
                </button>  
              </div>  
            </form>  
          </motion.div>  
        </div>  
      </div>  
    );  
  }  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8">  
      <div className="container mx-auto px-4">  
        <motion.div  
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}  
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 mb-8"  
        >  
          <div className="flex items-center gap-4 mb-6">  
            <User className="w-8 h-8 text-blue-600" />  
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">  
              Dashboard Admin - {currentUser?.name}  
            </h1>  
          </div>  
          <p className="text-gray-600 mb-6">Maneja la tienda: agrega/editar productos, ve stats.</p>  
        </motion.div>  

        <motion.div  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"  
        >  
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 flex items-center gap-4">  
            <BarChart3 className="w-8 h-8 text-blue-600" />  
            <div>  
              <p className="text-gray-600">Productos Totales</p>  
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>  
            </div>  
          </div>  
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 flex items-center gap-4">  
            <DollarSign className="w-8 h-8 text-yellow-600" />  
            <div>  
              <p className="text-gray-600">Ventas Este Mes</p>  
              <p className="text-2xl font-bold text-gray-900">${stats.totalSales}</p>  
            </div>  
          </div>  
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 flex items-center gap-4">  
            <Users className="w-8 h-8 text-green-600" />  
            <div>  
              <p className="text-gray-600">Usuarios Activos</p>  
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>  
            </div>  
          </div>  
        </motion.div>  

        <motion.div  
          initial={{ opacity: 0, x: -20 }}  
          animate={{ opacity: 1, x: 0 }}  
          className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-200"  
        >  
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Agregar Nuevo Producto</h2>  
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">  
            <input  
              type="text"  
              placeholder="Nombre del producto"  
              value={newProduct.name}  
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}  
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
              required  
            />  
            <input  
              type="number"  
              placeholder="Precio ($)"  
              value={newProduct.price}  
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}  
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
              required  
            />  
            <input  
              type="url"  
              placeholder="URL de imagen (opcional)"  
              value={newProduct.image}  
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}  
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"  
            />  
            <select  
              value={newProduct.category}  
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}  
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"  
            >  
              <option value="hombres">Hombres</option>  
              <option value="mujeres">Mujeres</option>  
              <option value="zapatos">Zapatos</option>  
            </select>  
            <motion.button  
              whileHover={{ scale: 1.05 }}  
              whileTap={{ scale: 0.95 }}  
              type="submit"  
              className="md:col-span-2 bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"  
            >  
              <Plus className="w-5 h-5" />  
              Agregar Producto  
            </motion.button>  
          </form>  
        </motion.div>  

        <motion.div  
          initial={{ opacity: 0, x: 20 }}  
          animate={{ opacity: 1, x: 0 }}  
          className="mb-8"  
        >  
          <motion.button  
            whileHover={{ scale: 1.05 }}  
            onClick={handleExport}  
            className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2"  
          >  
            <Download className="w-5 h-5" />  
            Exportar Productos (JSON)  
          </motion.button>  
        </motion.div>  

        <motion.div  
          initial={{ opacity: 0, x: 20 }}  
          animate={{ opacity: 1, x: 0 }}  
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"  
        >  
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Productos Gestionados ({managedProducts.length})</h2>  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  
            {managedProducts.map(product => (  
              <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">  
                <img src={product.image || 'https://via.placeholder.com/300x200?text=Imagen'} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />  
                <h3 className="font-bold">{product.name}</h3>  
                <p className="text-blue-600">${product.price}</p>  
                <p className="text-gray-500 text-sm capitalize">{product.category}</p>  
                <div className="flex gap-2 mt-2">  
                  <button onClick={() => handleEdit(product)} className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">  
                    <Edit className="w-4 h-4" />  
                  </button>  
                  <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200">  
                    <Trash className="w-4 h-4" />  
                  </button>  
                </div>  
              </div>  
            ))}  
          </div>  
        </motion.div>  
      </div>  
    </div>  
  );  
};  

export default Dashboard;