import { Navigate, Outlet } from "react-router-dom";
import { useTokenStore } from "../store/tokenStore";

const ProtectedRoute = () => {
  const accessToken = useTokenStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
