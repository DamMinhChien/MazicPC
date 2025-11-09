import axiosClient from "./axiosClient";

const couponServices = {
  // Lấy tất cả coupons
  async getCoupons() {
    const res = await axiosClient.get("Coupons");
    return res.data;
  },

  // Lấy 1 coupon theo code (hoặc id nếu backend hỗ trợ)
  async getCoupon(codeOrId) {
    const res = await axiosClient.get(`Coupons/${codeOrId}`);
    return res.data;
  },

  // Tạo mới coupon
  async createCoupon(data) {
    const res = await axiosClient.post("Coupons", data);
    return res.data;
  },

  // Cập nhật coupon
  async updateCoupon(data) {
    const res = await axiosClient.put(`Coupons/${data.id}`, data);
    return res.data;
  },

  // Xóa 1 coupon
  async deleteCoupon(id) {
    const res = await axiosClient.delete(`Coupons/${id}`);
    return res.data;
  },

  // Xóa nhiều coupon
  async deleteCoupons(ids) {
    await axiosClient.delete("Coupons/bulk", { data: ids });
  },

  async validateCoupon(code) {
    const res = await axiosClient.get(`Coupons/validate/${code}`);
    return res.data;
  }
};

export default couponServices;
