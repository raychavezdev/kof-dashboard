import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isValidToken }) => {
  return isValidToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
