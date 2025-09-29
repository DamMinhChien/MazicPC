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
  await axiosClient.put(`accounts/${account.id}`, account);
}

const deleteAccount = async (id) => {
  await axiosClient.delete(`accounts/${id}`);
}

const accountServices = { getAccounts, isExistAccount, createAccount, updateAccount, deleteAccount };
export default accountServices;
