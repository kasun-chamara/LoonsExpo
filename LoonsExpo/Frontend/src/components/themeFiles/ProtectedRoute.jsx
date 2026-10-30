import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const user = useSelector(state => state.auth.user);
  const hasAnyRole = (roles) => {
    if (!user || !user.roles) return false;
    const userRoles = user.roles.map(r => r.toLowerCase());
    return roles.some(role => userRoles.includes(role.toLowerCase()));
  };
  if (requiredRoles.length && !hasAnyRole(requiredRoles)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedRoute;
