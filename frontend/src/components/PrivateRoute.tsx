import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = () => {
  const access_token = useAppSelector((state) => state.auth.access_token);

  // If token exists, render the child routes (via Outlet)
  // Otherwise, kick them to signin
  return access_token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;