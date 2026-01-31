import api from "./axios";


const PRODUCT_URL = import.meta.env.VITE_PRODUCT_SERVICE_URL

//Get All products 
export const getProducts = async () => {
  const res = await api.get(
    `${PRODUCT_URL}/products/get-all`
  );
  return res.data; // backend response
};



//get product by id 
 export const getProductById = async (id) => {
    const {data} = await api.get(`${PRODUCT_URL}/products/get-product-by-id/${id}`);
    return data;

 }


export const createProduct = async (payload) => {
  const res = await api.post(`${PRODUCT_URL}/products/createProduct`, payload);
  return res.data;
};

export const updateProduct = async ({ id, data }) => {
  const res = await api.put(`${PRODUCT_URL}/products/update/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`${PRODUCT_URL}/products/delete/${id}`);
  return res.data;
};
