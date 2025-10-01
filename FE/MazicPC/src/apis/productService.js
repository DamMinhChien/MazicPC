import axiosClient from "./axiosClient";

const getProducts = async () => {
  const res = await axiosClient.get("products");
  console.log("products:", res);
  return res.data;
};

const productService = { getProducts };
export default productService;
