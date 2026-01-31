import { getProductById,
   getProducts,
  createProduct,
  updateProduct,
  deleteProduct } from "@/api/proudct.api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialData: [], // 🛡️ prevents undefined
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};


// CREATE
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

// UPDATE
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

// DELETE
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};