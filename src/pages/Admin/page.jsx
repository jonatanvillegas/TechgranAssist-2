import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Pencil, Trash2, X } from 'lucide-react';
import { useFirebase } from '@/context/FirebaseContext';


// Datos para las gráficas
const userRoleData = [
  { name: 'Admin', value: 2 },
  { name: 'Usuario', value: 3 },
];

const userGrowthData = [
  { name: 'Ene', usuarios: 2 },
  { name: 'Feb', usuarios: 3 },
  { name: 'Mar', usuarios: 3 },
  { name: 'Abr', usuarios: 4 },
  { name: 'May', usuarios: 5 },
];

const COLORS = ['#008000', '#4CAF50'];

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const {getAllUsersInRealTime,deleteUserById,updateUser} = useFirebase();

  const handleEdit =(user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete =async (id) => {
    try {
      await deleteUserById(id);
      console.log('Usuario eliminado con éxito');
      // Aquí puedes manejar la UI después de eliminar el usuario
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    await updateUser(editingUser.uid,editingUser)
    console.log(editingUser)
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsersInRealTime(setUsers);
        console.log('Usuarios:', users);
        // Aquí puedes manejar el estado para mostrar los usuarios en la UI
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsers();
  }, [getAllUsersInRealTime]);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#008000]">Panel Administrativo de Usuarios</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Gráfica de Barras */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#008000]">Crecimiento de Usuarios</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usuarios" fill="#008000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Pastel */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#008000]">Distribución de Roles de Usuario</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRoleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {userRoleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold p-4 bg-[#008000] text-white">Gestión de Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-200 text-[#008000]">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Email</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100">
                  <td className="p-3">{user.nombre}</td>
                  <td className="p-3">{user.correo}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <button onClick={() => handleEdit(user)} className="mr-2 text-[#008000] hover:text-green-700">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(user.uid)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Edición */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#008000]">Editar Usuario</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveUser}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editingUser.nombre}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008000] focus:ring focus:ring-[#008000] focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                <select
                  id="role"
                  name="role"
                  value={editingUser.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008000] focus:ring focus:ring-[#008000] focus:ring-opacity-50"
                >
                  <option value="Admin">Admin</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#008000] rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008000]"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}