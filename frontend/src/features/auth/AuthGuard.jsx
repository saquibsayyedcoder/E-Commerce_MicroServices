// features/auth/AuthGuard.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminGuard = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user?.role === "ADMIN" ? children : <Navigate to="/" />;
};
