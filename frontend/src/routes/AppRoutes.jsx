import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Fixed import source
import Login from "../pages/Login";
import Products from "../pages/Products";
import { AdminGuard } from '../features/auth/AuthGuard'; // Changed @ to relative path
import AdminDashboard from "../pages/AdminDashboard";
import Home from "../pages/Home";
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;