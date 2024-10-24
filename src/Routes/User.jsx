import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../Pages/Users/HomePage';


const UserRoutes = () => {
    const state = useSelector((state) => state);
  const { isAuthenticated, role } =  useSelector((state) => state.userData);

  if (!isAuthenticated) {
    return <Navigate to="/" />; 
  }

  if (role == 'client') {
    return <Navigate to="/client/home" />; 
  }

  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" />; 
  }

  return (
    <Routes>
   
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default UserRoutes;
