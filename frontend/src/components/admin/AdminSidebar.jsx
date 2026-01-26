import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-background border-r">
      <div className="p-6 text-xl font-bold">Admin Panel</div>

      <nav className="space-y-2 px-4">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition 
              ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
