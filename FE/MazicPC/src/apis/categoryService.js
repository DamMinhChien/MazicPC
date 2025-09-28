import axiosClient from "./axiosClient";

const getCategories = async () => {
  const res = await axiosClient.get("categories");
  return res.data;
};

const getCategoriesWithProducts = async () => {
  const res = await axiosClient.get("Categories/with-products");
  return res;
};

const categoryServices = {
  getCategories,
  getCategoriesWithProducts,
};
export default categoryServices;
