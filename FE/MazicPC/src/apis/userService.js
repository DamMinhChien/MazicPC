import axiosClient from "./axiosClient";

const userService = {
  // GET có data
  getUsers: async () => {
    const res = await axiosClient.get("users");
    return res.data;
  },

  getUserById: async (id) => {
    const res = await axiosClient.get(`users/${id}`);
    return res.data;
  },

  // PUT/DELETE chỉ cần chờ thành công, không cần res.data
  updateMe: async (data) => {
    await axiosClient.put("users/me", data);
  },

  updateUser: async (id, data) => {
    await axiosClient.put(`users/${id}`, data);
  },

  deleteUser: async (id) => {
    await axiosClient.delete(`users/${id}`);
  },

  deleteUsers: async (ids) => {
    await axiosClient.delete("users/bulk", { data: ids });
  },
};
export default userService;
