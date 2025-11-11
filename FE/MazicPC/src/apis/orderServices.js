import axiosClient from "./axiosClient";

const orderServices = {
  // 🛒 Lấy danh sách đơn hàng của user hiện tại
  async getOrders() {
    const res = await axiosClient.get("Orders");
    return res.data;
  },

  async getAdminOrders() {
    const res = await axiosClient.get("Orders/admin");
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

  // 🔄 Admin: Cập nhật trạng thái đơn hàng
  async updateOrderStatus(order) {
    const res = await axiosClient.put(`Orders/${order.id}/status`, { status: order.status });
    return res.data;
  },

  // // 💳 Lấy thông tin thanh toán của 1 đơn hàng
  // async getOrderPayments(id) {
  //   const res = await axiosClient.get(`Orders/${id}/payments`);
  //   return res.data;
  // },
};

export default orderServices;
