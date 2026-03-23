// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const access_token = useAppSelector((state) => state.auth.access_token);

  if (!access_token) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User logged in, show the children
  return children;
};

export default PrivateRoute;