import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../Service/Redux/Slice/authSlice';
import { useNavigate } from 'react-router-dom';

function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin'); 
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white w-64 flex flex-col justify-between">
      <div className="flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <nav className="flex flex-col space-y-6">
          <a
            href="/admin/dashboard"
            className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded-lg"
          >
            <span>Dashboard</span>
          </a>
          <a
            href="/admin/clients"
            className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded-lg"
          >
            <span>Client Management</span>
          </a>
          <a
            href="/admin/users"
            className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded-lg"
          >
            <span>User Management</span>
          </a>
        </nav>
      </div>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-500 hover:text-red-400 hover:bg-gray-700 p-3 rounded-lg w-full"
        >
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
