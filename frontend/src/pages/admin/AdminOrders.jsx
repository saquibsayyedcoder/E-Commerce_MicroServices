import {
  useAdminOrders,
  useAdminUpdateOrderStatus,
} from "@/features/orders/order.queries";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const { data = [], isLoading, isError } = useAdminOrders();
  const updateStatus = useAdminUpdateOrderStatus();

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p className="text-red-500">Failed to load orders</p>;

  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <p>No orders found</p>
      ) : (
        data.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 space-y-1"
          >
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>User:</b> {order.userId}</p>
            <p><b>Total:</b> ₹{order.total}</p>
            <p><b>Status:</b> {order.status}</p>

            {order.status !== "DELIVERED" && (
              <select
                className="border p-2 mt-2"
                defaultValue=""
                onChange={(e) =>
                  updateStatus.mutate(
                    {
                      id: order.id,
                      status: e.target.value,
                    },
                    {
                      onSuccess: () =>
                        toast.success("Status updated"),
                      onError: (err) =>
                        toast.error(
                          err.response?.data?.message ||
                          "Failed to update status"
                        ),
                    }
                  )
                }
              >
                <option value="" disabled>
                  Change Status
                </option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
              </select>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
