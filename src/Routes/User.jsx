import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import UserHome from './UserHome'; 
import UserLogin from '../Pages/Users/LoginPage';

const UserRoutes = () => {
    const state = useSelector((state) => state);
console.log('==================',state);
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
    <Route path="/" element={<UserLogin />} />
      {/* <Route path="/home" element={<UserHome />} /> */}
    </Routes>
  );
};

export default UserRoutes;
