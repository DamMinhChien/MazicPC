import axiosClient from "./axiosClient";

const orderServices = {
  // 🛒 Lấy danh sách đơn hàng của user hiện tại
  async getMyOrders() {
    const res = await axiosClient.get("Orders/my");
    return res.data;
  },

  // 🔍 Lấy chi tiết 1 đơn hàng
  async getOrder(id) {
    const res = await axiosClient.get(`Orders/${id}`);
    return res.data;
  },

  // ➕ Tạo đơn hàng mới
  async createOrder(data) {
    const res = await axiosClient.post("Orders", data);
    return res.data;
  },

  // ❌ Hủy đơn hàng (user)
  async cancelOrder(id) {
    const res = await axiosClient.put(`Orders/${id}/cancel`);
    return res.data;
  },

  // 🧾 Admin: Lấy tất cả đơn hàng
  async getAllOrders() {
    const res = await axiosClient.get("Orders");
    return res.data;
  },

  // 🔄 Admin: Cập nhật trạng thái đơn hàng
  async updateOrderStatus(id, newStatus) {
    const res = await axiosClient.put(`Orders/${id}/status`, newStatus, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

  // 💳 Lấy thông tin thanh toán của 1 đơn hàng
  async getOrderPayments(id) {
    const res = await axiosClient.get(`Orders/${id}/payments`);
    return res.data;
  },
};

export default orderServices;
