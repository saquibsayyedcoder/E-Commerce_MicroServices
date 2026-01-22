
import React,{Routes, Route} from 'react'
import Login from "../pages/Login";
import Products from "../pages/Products";
import { AdminGuard } from '@/features/auth/AuthGuard';
import AdminDashboard from "../pages/AdminDashboard";

const AppRoutes = () => {
  return (
    <div>
        <Routes>
<Route path="/login" element={<Login  />} />
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
  )
}

export default AppRoutes