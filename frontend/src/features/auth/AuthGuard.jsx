import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthGuard = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

export const AdminGuard = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user?.role === "ADMIN" ? children : <Navigate to="/" />;
};
