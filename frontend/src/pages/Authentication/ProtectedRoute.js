import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isLogout }) => {
 
  if(isLogout){
    localStorage.clear();
  }   
  const isAuthenticated = localStorage.getItem('authToken');

  if (!isAuthenticated) {
    return <Navigate to="/" />; 
  }

  return element; 
};

export default ProtectedRoute;
