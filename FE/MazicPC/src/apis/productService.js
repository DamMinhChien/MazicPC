import axiosClient from "./axiosClient";

const productServices = {
  // Lấy tất cả products
  async getProducts() {
    const res = await axiosClient.get("Products");
    return res.data;
  },

  // Lấy 1 product theo id
  async getProduct(id) {
    const res = await axiosClient.get(`Products/${id}`);
    return res.data;
  },

  // Tạo mới product (có file -> multipart/form-data)
  async createProduct(data, file) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    if (file) {
      formData.append("file", file);
    }

    const res = await axiosClient.post("Products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Cập nhật product
  async updateProduct(data, file) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    if (file) {
      formData.append("file", file);
    }

    const res = await axiosClient.put(`Products/${data.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Xóa 1 product
  async deleteProduct(id) {
    const res = await axiosClient.delete(`Products/${id}`);
    return res.data;
  },

  // Xóa nhiều product
  async deleteProducts(ids) {
    await axiosClient.delete("Products/bulk", { data: ids });
  },

  // Check tồn tại
  async existProduct(id) {
    const res = await axiosClient.get(`Products/exist/${id}`);
    return res.data; // true/false
  },
};

export default productServices;
