import axiosClient from "./axiosClient";

const getProducts = async () => {
  const res = await axiosClient.get("products");
  return res.data;
};

const productService = { getProducts };
export default productService;
