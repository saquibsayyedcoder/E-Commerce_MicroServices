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
import CreateProduct from "@/pages/admin/CreateProducts";
import EditProduct from "@/pages/admin/EditProduct";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@/components/ErrorBoundary";
import Register from "@/pages/Register";



const AppRoutes = () => {
  return (
   <>
  <ErrorBoundary>
      <Routes>
      {/* 🌍 Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
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
  <Route path="products/create" element={<CreateProduct />} />
  <Route
  path="/admin/products/edit/:id"
  element={<EditProduct />}
/>
<Route path="orders" element={<AdminOrders/>} />
</Route>

    </Routes>
  </ErrorBoundary>
    <ToastContainer/>
   </>
  
  );
};

export default AppRoutes;
