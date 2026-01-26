import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import { AuthGuard } from "@/features/auth/AuthGuard";
import AdminGuard from "@/features/auth/AdminGuard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminProducts from "@/pages/admin/AdminPorducts";
import AdminOrders from "@/pages/admin/AdminOrders";


const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌍 Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />

      {/* 🔐 User Protected */}
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <div>User Profile</div>
          </AuthGuard>
        }
      />

     {/* 🛡️ Admin Protected (Nested) */}
      <Route
        path="/admin"
        element={
          <AdminGuard>
            <AdminLayout />
          </AdminGuard>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
