import React from 'react';
import AdminSidebar from './Sidebar'; 
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow p-10">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
