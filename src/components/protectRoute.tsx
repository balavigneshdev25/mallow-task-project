import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../utils/cookie"; 

const ProtectedRoute: React.FC = () => {
  const token = getCookie("accessToken"); 

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
