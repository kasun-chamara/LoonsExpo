import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navigationItems } from '../navigation/navigations';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles required, allow access
  if (requiredRoles.length === 0) {
    return children;
  }

  // Check if user has required role
  const hasAnyRole = (roles) => {
    if (!user || !user.roles) return false;
    const userRoles = user.roles.map(r => r.toLowerCase());
    return roles.some(role => userRoles.includes(role.toLowerCase()));
  };
  if (requiredRoles.length && !hasAnyRole(requiredRoles)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// Helper function to get required roles for a path
export const getRequiredRoles = (path) => {
  const findRoles = (items) => {
    for (const item of items) {
      if (item.path === path) {
        return item.roles;
      }
      if (item.submenu) {
        const subRoles = findRoles(item.submenu);
        if (subRoles) return subRoles;
      }
    }
    return null;
  };

  return findRoles(navigationItems) || ['admin', 'user'];
};

export default ProtectedRoute;
