import axiosClient from "./axiosClient";

const getCarts = async () => {
  const res = await axiosClient.get("carts");
  return res.data;
};

const getCart = async () => {
  const res = await axiosClient.get(`carts/me`);
  return res.data;
};

const addToCart = async (cartItem) => {
  const res = await axiosClient.post("carts", cartItem);
  return res.data;
};

const updateCart = async (productId, cartItem) => {
  await axiosClient.put(`carts/${productId}`, cartItem);
};

const deleteCart = async (id) => {
  await axiosClient.delete(`carts/${id}`);
};

const deleteCarts = async (ids) => {
  console.log("Xóa nhiều giỏ hàng:", ids);
  await axiosClient.delete(`carts/bulk`, { data: ids });
};

// export object
const cartService = {
  getCarts,
  getCart,
  addToCart,
  updateCart,
  deleteCart,
  deleteCarts,
};

export default cartService;
