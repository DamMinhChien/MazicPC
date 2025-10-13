import axiosClient from "./axiosClient";

const categoryServices = {
  // Lấy category dạng cây cho user
  async getCategoryTree() {
    const res = await axiosClient.get("Categories/tree");
    return res.data;
  },

  // Lấy tất cả categories (admin)
  async getCategories() {
    const res = await axiosClient.get("Categories");
    return res.data;
  },

  // Lấy categories kèm products
  async getCategoriesWithProducts() {
    const res = await axiosClient.get("Categories/with-products");
    return res.data;
  },

  async getCategoriesRoot() {
    const res = await axiosClient.get("Categories/roots");
    return res.data;
  },

  async getCategoriesNotRoot() {
    const res = await axiosClient.get("Categories/not-roots");
    return res.data;
  },

  // Lấy 1 category theo id
  async getCategory(id) {
    const res = await axiosClient.get(`Categories/${id}`);
    return res.data;
  },

  // Tạo mới category (có hỗ trợ file upload)
  async createCategory(data, file) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    if (file) {
      formData.append("file", file);
    }

    const res = await axiosClient.post("Categories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Cập nhật category (có hỗ trợ file upload)
  async updateCategory(data, file) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    if (file) {
      formData.append("file", file);
    }

    const res = await axiosClient.put(`Categories/${data.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Xóa 1 category
  async deleteCategory(id) {
    const res = await axiosClient.delete(`Categories/${id}`);
    return res.data;
  },

  // Xóa nhiều categories
  async deleteCategories(ids) {
    await axiosClient.delete("Categories/bulk", { data: ids });
  },

  // Check tồn tại
  async existCategory(id) {
    const res = await axiosClient.get(`Categories/exist/${id}`);
    return res.data; // true/false
  },
};

export default categoryServices;
