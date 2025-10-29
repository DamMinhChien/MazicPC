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

  // ➕ Sửa: updateMe gửi multipart/form-data đúng cách
  updateMe: async (data, file) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    if (file) {
      formData.append("file", file);
    }

    // GỌI API đúng: body là formData
    await axiosClient.put("users/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateUser: async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        if (key === "file") {
          // nếu có file thì append kiểu file
          formData.append("file", data[key]);
        } else {
          // ép boolean sang string để backend parse đúng
          const value =
            typeof data[key] === "boolean" ? data[key].toString() : data[key];
          formData.append(key, value);
        }
      }
    });

    await axiosClient.put(`users/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteUser: async (id) => {
    await axiosClient.delete(`users/${id}`);
  },

  deleteUsers: async (ids) => {
    await axiosClient.delete("users/bulk", { data: ids });
  },
};
export default userService;
