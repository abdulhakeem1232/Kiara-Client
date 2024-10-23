import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ClientHome from './ClientHome'; 
import ClientLogin from '../Pages/Clients/LoginPage';

const ClientRoutes = () => {
  const { isAuthenticated, role } =  useSelector((state) => state.userData);

  if (!isAuthenticated) {  
    return <ClientLogin />; 
  }

  if (role === 'user') {
    console.log('2');

    return <Navigate to="/home" />; 
  }

  if (role === 'admin') {
    console.log('3');

    return <Navigate to="/admin/dashboard" />; 
  }

  return (
    <Routes>
      
      
    </Routes>
  );
};

export default ClientRoutes;
