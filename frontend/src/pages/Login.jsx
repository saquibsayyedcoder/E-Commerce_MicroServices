import { loginUser } from '@/api/auth.api';
import AuthLayout from '@/components/Layout/AuthLayout';
import { loginSuccess } from '@/features/auth/authSclice';
import { Label } from "@/components/ui/label";
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

export default function login () {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email:"", password:""});

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(form);
    mutation.mutate(form);
  };

  return(
    <AuthLayout title="login">
      <form onSubmit={submitHandler} className='space-y-4'>
        <div>
          <Label>Email</Label>
          <Input 
          value={form.email}
          onChange={(e) => setForm({...form, email:e.target.value})} 
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
          type="password"
          value={form.password}
          onChange={(e) => 
            setForm({...form, password:e.target.value})
          }
           />
        </div>
        <Button className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Loggin in..." : "Login"}
        </Button>

        {
          mutation.isError && (
            <p className='text-red-500 text-sm'>
              {mutation.error.response?.data?.message || "Login Failed"}
            </p>
          )
        }
      </form>

    </AuthLayout>
  )



}