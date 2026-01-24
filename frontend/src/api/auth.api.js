import api from "./axios";

const AUTH_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

export const loginUser = async (data) => {
  const res = await api.post(`${AUTH_URL}/api/auth/login`, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post(`${AUTH_URL}/api/auth/register`, data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post(`${AUTH_URL}/api/auth/logout`);
  return res.data;
};
