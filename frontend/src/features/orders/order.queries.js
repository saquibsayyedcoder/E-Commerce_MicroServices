import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  allOrdersApi,
  updateOrderStatusApi,
} from "@/api/order.api";

// ADMIN ORDERS
export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: allOrdersApi,
    select: (res) => res.data, // ✅ unwrap axios
    initialData: [],           // ✅ NEVER undefined
  });
};

// UPDATE STATUS
export const useAdminUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-orders"]);
    },
  });
};
