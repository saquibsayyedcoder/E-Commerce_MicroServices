// features/payments/payment.mutations.js
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";

export const usePay = () => {
  return useMutation({
    mutationFn: (data) =>
      api.post("/payments/pay", data),
  });
};
