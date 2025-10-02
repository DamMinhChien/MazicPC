import axiosClient from "./axiosClient";

const productImageServices = {
  // Lấy tất cả product images 
  async getProductImages() {
    const res = await axiosClient.get("ProductImages");
    return res.data;
  },

  // Lấy 1 product image theo id
  async getProductImage(id) {
    const res = await axiosClient.get(`ProductImages/${id}`);
    return res.data;
  },

  // Tạo mới product image (có file)
  async createProductImage(data, file) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (file) {
      formData.append("file", file);
    }

    const res = await axiosClient.post("ProductImages", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Cập nhật product image (có file)
  async updateProductImage(data, file) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (file) {
      formData.append("file", file);
    }

    const res = await axiosClient.put(`ProductImages/${data.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Xóa 1 product image
  async deleteProductImage(id) {
    const res = await axiosClient.delete(`ProductImages/${id}`);
    return res.data;
  },

  // Xóa nhiều product images
  async deleteProductImages(ids) {
    const res = await axiosClient.delete("ProductImages/bulk", { data: ids });
    return res.data;
  },

  // Check tồn tại
  async existProductImage(id) {
    const res = await axiosClient.get(`ProductImages/exist/${id}`);
    return res.data; // true/false
  },
};

export default productImageServices;
