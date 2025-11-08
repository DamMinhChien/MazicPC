import axiosClient from "./axiosClient";

// Lấy top 10 review mới nhất (có thể để show ở trang chủ)
const getTop10Reviews = async () => {
  const res = await axiosClient.get("reviews/top10");
  return res.data;
};

// Lấy toàn bộ review của 1 sản phẩm
const getReviewsByProduct = async (productId) => {
  const res = await axiosClient.get(`reviews/${productId}`);
  return res.data;
};

// Tạo mới review (chỉ user đã mua hàng mới được)
const createReview = async (review) => {
  const res = await axiosClient.post("reviews", review);
  return res.data;
};

// Cập nhật review (chỉ user chủ sở hữu review được phép)
const updateReview = async (id, review) => {
  await axiosClient.put(`reviews/${id}`, review);
};

// Xóa review của user hiện tại
const deleteReview = async (id) => {
  await axiosClient.delete(`reviews/${id}`);
};

// Export ra object tiện import
const reviewService = {
  getTop10Reviews,
  getReviewsByProduct,
  createReview,
  updateReview,
  deleteReview,
};

export default reviewService;
