import axiosClient from "./axiosClient";

const getAccounts = async () => {
  const res = await axiosClient.get("accounts");
  return res.data;
};

const isExistAccount = async (id) => {
  const res = await axiosClient.get(`accounts/exist/${id}`);
  return res.data;
};

// CRUD account APIs here
const createAccount = async (account) => {
  const res = await axiosClient.post("accounts", account);
  return res.data;
}

const updateAccount = async (account) => {
  const res = await axiosClient.put(`accounts/${account.id}`, account);
  return res.data;
}

const deleteAccount = async (id) => {
  const res = await axiosClient.delete(`accounts/${id}`);
  return res.data;
}

const accountServices = { getAccounts, isExistAccount, createAccount, updateAccount, deleteAccount };
export default accountServices;
