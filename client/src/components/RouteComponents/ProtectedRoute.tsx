import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const token = localStorage.getItem('TOKEN');
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
