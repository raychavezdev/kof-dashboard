import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isValidToken }) => {
  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  return isValidToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
