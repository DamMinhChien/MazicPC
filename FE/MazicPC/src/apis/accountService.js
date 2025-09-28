import axiosClient from "./axiosClient";

const getAccounts = async () => {
  const res = await axiosClient.get("accounts");
  return res.data;
};

const isExistAccount = async (id) => {
  const res = await axiosClient.get(`exist/${id}`);
  return res.data;
};

const accountServices = { getAccounts, isExistAccount };
export default accountServices;
