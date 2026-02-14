import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Navigate } from "react-router-dom";

import { registerUser } from "@/api/auth.api";
import { loginStart, loginSuccess, loginFailure } from "@/features/auth/authSclice";

import AuthLayout from "@/components/Layout/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔐 If already logged in → redirect
  if (token && user) {
    return (
      <Navigate
        to={user.role === "ADMIN" ? "/admin" : "/"}
        replace
      />
    );
  }

  const mutation = useMutation({
    mutationFn: registerUser,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data));

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect after registration
      navigate("/", { replace: true });
    },
    onError: (error) => {
      dispatch(
        loginFailure(
          error?.response?.data?.message || "Registration failed"
        )
      );
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={submitHandler} className="space-y-4">

        {/* Name */}
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />
        </div>

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
          {mutation.isPending ? "Creating account..." : "Register"}
        </Button>

        {/* Error */}
        {mutation.isError && (
          <p className="text-red-500 text-sm text-center">
            {mutation.error?.response?.data?.message ||
              "Something went wrong"}
          </p>
        )}
      </form>

      {/* Optional link */}
      <p className="text-sm text-center mt-4 text-muted-foreground">
        Already have an account?{" "}
        <span
          className="text-primary cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </AuthLayout>
  );
}
