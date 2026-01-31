import { loginUser } from "@/api/auth.api";
import AuthLayout from "@/components/Layout/AuthLayout";
import { loginStart, loginSuccess, loginFailure } from "@/features/auth/authSclice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (token && user) {
      const role = user?.role;
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [token, user, navigate]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
      
      // Navigate based on role
      const role = data?.user?.role;
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <Button className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>

        {mutation.isError && (
          <p className="text-red-500 text-sm text-center">
            {mutation.error.response?.data?.message || "Login failed"}
          </p>
        )}
      </form>
    </AuthLayout>
  );
}