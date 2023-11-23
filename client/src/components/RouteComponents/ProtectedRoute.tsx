import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = cookies.get("TOKEN");
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
  

export default ProtectedRoute;