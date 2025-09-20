import axiosClient from "./axiosClient";

const getCategoriesWithProducts = async () => {
  const res = await axiosClient.get("Categories/with-products");
  return res;
};

export default getCategoriesWithProducts;
