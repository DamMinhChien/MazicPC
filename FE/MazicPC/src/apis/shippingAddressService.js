import axiosClient from "./axiosClient";

const getShippingAddresses = async () => {
  const res = await axiosClient.get("shippingaddresses");
  return res.data;
};

const getShippingAddress = async (id) => {
  const res = await axiosClient.get(`shippingaddresses/${id}`);
  return res.data;
};

const addShippingAddress = async (address) => {
  const res = await axiosClient.post("shippingaddresses", address);
  return res.data;
};

const updateShippingAddress = async (id, address) => {
  await axiosClient.put(`shippingaddresses/${id}`, address);
};

const deleteShippingAddress = async (id) => {
  await axiosClient.delete(`shippingaddresses/${id}`);
};

// export object
const shippingAddressService = {
  getShippingAddresses,
  getShippingAddress,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};

export default shippingAddressService;
