import axiosClient from "./axiosClient";

const bannerServices = {
  // Lấy tất cả banner
  async getBanners() {
    const res = await axiosClient.get("Banners");
    return res.data;
  },

  // Lấy 1 banner theo id
  async getBanner(id) {
    const res = await axiosClient.get(`Banners/${id}`);
    return res.data;
  },

  // Tạo mới banner
  async createBanner(data) {
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
    const res = await axiosClient.post("Banners", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Cập nhật banner
  async updateBanner(data) {
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

    await axiosClient.put(`Banners/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Xóa 1 banner
  async deleteBanner(id) {
    const res = await axiosClient.delete(`Banners/${id}`);
  },

  // Xóa nhiều banner
  deleteBanners: async (ids) => {
    await axiosClient.delete("Banners/bulk", { data: ids });
  },

  // Check tồn tại
  async existBanner(id) {
    const res = await axiosClient.get(`Banners/exist/${id}`);
    return res.data; // true/false
  },
};

export default bannerServices;
