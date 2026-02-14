import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";

import { loginStart, loginSuccess, loginFailure } from "@/features/auth/authSclice";
import { loginUser } from "@/api/auth.api";

import AuthLayout from "@/components/Layout/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 🔒 If already logged in → redirect
  if (token && user) {
    return (
      <Navigate
        to={user.role === "ADMIN" ? "/admin" : "/"}
        replace
      />
    );
  }

  const mutation = useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data));

      // Save token locally (important)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect after login
      navigate(data.user.role === "ADMIN" ? "/admin" : "/", {
        replace: true,
      });
    },
    onError: (error) => {
      dispatch(
        loginFailure(
          error?.response?.data?.message || "Login failed"
        )
      );
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={submitHandler} className="space-y-4">
        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
        </div>

        {/* Password */}
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>

        {/* Error Message */}
        {mutation.isError && (
          <p className="text-red-500 text-sm text-center">
            {mutation.error?.response?.data?.message ||
              "Invalid email or password"}
          </p>
        )}
      </form>
    </AuthLayout>
  );
}
