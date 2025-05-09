import { Outlet, Navigate } from "react-router-dom";
import useToken from "../commonHooks/useToken";

const ProtectedRoute = () => {
  const  token = useToken();
  return !token ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedRoute;