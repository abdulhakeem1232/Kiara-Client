import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLogin from '../Pages/Admin/LoginPage';
import DashboardPage from '../Pages/Admin/DashboardPage';
import UserManagementPage from '../Pages/Admin/UserManagementPage';
import ClientManagementPage from '../Pages/Admin/ClientManagementPage';
import AdminLayout from '../Components/Admin/AdminLayout';
import PancardPage from '../Pages/Admin/PancardPage';

const AdminRoutes = () => {
  const { isAuthenticated, role } = useSelector((state) => state.userData);

  if (!isAuthenticated) {
    return <AdminLogin />; 
  }

  if (role === 'user') {
    return <Navigate to="/home" />; 
  }

  if (role === 'client') {
    return <Navigate to="/client/home" />; 
  }

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="clients" element={<ClientManagementPage />} />
        <Route path="pancard" element={<PancardPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
