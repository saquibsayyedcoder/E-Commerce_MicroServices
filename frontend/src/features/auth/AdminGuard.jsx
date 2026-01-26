import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminGuard = ({ children }) => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminGuard;
