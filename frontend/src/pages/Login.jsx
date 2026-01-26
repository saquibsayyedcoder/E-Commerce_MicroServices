import { loginUser } from "@/api/auth.api";
import AuthLayout from "@/components/Layout/AuthLayout";
import { loginSuccess } from "@/features/auth/authSclice";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Save auth to redux
      dispatch(loginSuccess(data));

      // 🔀 Redirect based on role
      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(form); // ✅ only once
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

        {/* Button */}
        <Button className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>

        {/* Error */}
        {mutation.isError && (
          <p className="text-red-500 text-sm text-center">
            {mutation.error.response?.data?.message || "Login failed"}
          </p>
        )}
      </form>
    </AuthLayout>
  );
}
