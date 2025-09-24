import axiosClient from "./axiosClient";

const register = async (data) => {
  const res = await axiosClient.post("accounts/register", data);
  return res.data;
};

const login = async (data) => {
  const res = await axiosClient.post("login", data);
  return res.data;
};

const logout = async (data) => {
  const res = await axiosClient.post("logout", data);
  return res.data;
};

const me = async () => {
  const res = await axiosClient.get("me");
  return res.data;
};

const authService = { register, login, logout, me };
export default authService;
