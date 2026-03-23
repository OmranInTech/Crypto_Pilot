import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const access_token = useAppSelector((state) => state.auth.access_token);

  if (!access_token) {
    // User not logged in, redirect to signin page
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;