import axiosClient from "./axiosClient";

const register = async (data) => {
  const res = await axiosClient.post("accounts/register", data);
  return res.data;
};

const authService = { register };
export default authService;
