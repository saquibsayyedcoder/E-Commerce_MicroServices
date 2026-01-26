import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSclice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Bunky<span className="text-black">Store</span>
        </Link>

        {/* LINKS */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/products">Products</NavItem>
        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          
          {/* CART */}
          <Link to="/cart">
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          {/* AUTH */}
          {!isAuthenticated ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>

                {/* AUTHORIZATION (Admin Only) */}
                {user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard">Admin</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={logoutHandler}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

/* Reusable Nav Item */
const NavItem = ({ to, children }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `transition-colors ${
          isActive
            ? "text-primary font-semibold"
            : "text-gray-600 hover:text-primary"
        }`
      }
    >
      {children}
    </NavLink>
  </li>
);
