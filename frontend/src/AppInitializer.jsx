import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess, logout } from "@/features/auth/authSclice";

export default function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(
          loginSuccess({
            token,
            user: data.user,
          })
        );
      } catch (error) {
        dispatch(logout());
      }
    };

    verifyToken();
  }, [dispatch]);

  return children;
}
