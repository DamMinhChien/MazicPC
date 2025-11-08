import axiosClient from "./axiosClient";

const shippingMethodServices = {
  // Lấy tất cả shipping methods
  async getShippingMethods() {
    const res = await axiosClient.get("ShippingMethods");
    return res.data;
  },

  // Lấy 1 shipping method theo id
  async getShippingMethod(id) {
    const res = await axiosClient.get(`ShippingMethods/${id}`);
    return res.data;
  },

  // Tạo mới shipping method
  async createShippingMethod(data) {
    const res = await axiosClient.post("ShippingMethods", data);
    return res.data;
  },

  // Cập nhật shipping method
  async updateShippingMethod(data) {
    const res = await axiosClient.put(`ShippingMethods/${data.id}`, data);
    return res.data;
  },

  // Xóa 1 shipping method
  async deleteShippingMethod(id) {
    const res = await axiosClient.delete(`ShippingMethods/${id}`);
    return res.data;
  },

  // Xóa nhiều shipping methods
  async deleteShippingMethods(ids) {
    await axiosClient.delete("ShippingMethods/bulk", { data: ids });
  },
};

export default shippingMethodServices;
