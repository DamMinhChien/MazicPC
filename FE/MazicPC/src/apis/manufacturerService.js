import axiosClient from "./axiosClient";

const manufacturerServices = {
  // Lấy tất cả manufacturers
  async getManufacturers() {
    const res = await axiosClient.get("Manufacturers");
    return res.data;
  },

  // Lấy 1 manufacturer theo id
  async getManufacturer(id) {
    const res = await axiosClient.get(`Manufacturers/${id}`);
    return res.data;
  },

  // Tạo mới manufacturer
  async createManufacturer(data) {
    const res = await axiosClient.post("Manufacturers", data);
    return res.data;
  },

  // Cập nhật manufacturer
  async updateManufacturer(data) {
    const res = await axiosClient.put(`Manufacturers/${data.id}`, data);
    return res.data;
  },

  // Xóa 1 manufacturer
  async deleteManufacturer(id) {
    const res = await axiosClient.delete(`Manufacturers/${id}`);
    return res.data;
  },

  // Xóa nhiều manufacturer
  deleteManufacturers: async (ids) => {
    await axiosClient.delete("Manufacturers/bulk", { data: ids });
  },

  // Check tồn tại
  async existManufacturer(id) {
    const res = await axiosClient.get(`Manufacturers/exist/${id}`);
    return res.data; // true/false
  },
};

export default manufacturerServices;
