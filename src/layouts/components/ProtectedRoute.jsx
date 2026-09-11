import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');

  let user = null;
  try {
    const savedUser = localStorage.getItem('user');
    user = savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
  } catch (err) {
    user = null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    alert('Anda tidak memiliki akses ke halaman ini!');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
