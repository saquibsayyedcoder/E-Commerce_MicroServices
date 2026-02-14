import api from "./axios";

const ORDER_URL = import.meta.env.VITE_ORDER_URL;

// CREATE ORDER
export const createOrderApi = async (orderData) => {
  const res = await api.post(`${ORDER_URL}/orders/create-order`, orderData);
  return res.data; // ✅
};

// USER ORDERS
export const myOrdersApi = async () => {
  const res = await api.get(`${ORDER_URL}/orders/me`);
  return res.data; // ✅
};

// ADMIN: ALL ORDERS
export const allOrdersApi = async () => {
  const res = await api.get(`${ORDER_URL}/all-orders`);
  return res.data;
};

// ADMIN: UPDATE STATUS
export const updateOrderStatusApi = async ({ id, status }) => {
  const res = await api.put(
    `${ORDER_URL}/update/${id}/status`,
    { status }
  );
  return res.data;
};

// USER: CANCEL ORDER
export const cancelOrderApi = async (id) => {
  const res = await api.put(`${ORDER_URL}/orders/cancel-order/${id}`);
  return res.data; // ✅
};
