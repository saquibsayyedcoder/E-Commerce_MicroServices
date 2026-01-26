import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/authSclice";

const AdminHeader = () => {
  const dispatch = useDispatch();

  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-3">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      <Button variant="destructive" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </header>
  );
};

export default AdminHeader;
