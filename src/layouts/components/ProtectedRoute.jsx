import React from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const context = useOutletContext();

  let user = null;
  try {
    const savedUser = localStorage.getItem('user');
    user = savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
  } catch (error) {
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    alert('Anda tidak memiliki akses ke halaman ini!');
    return <Navigate to="/" replace />;
  }

  return <Outlet context={context} />;
};

export default ProtectedRoute;
