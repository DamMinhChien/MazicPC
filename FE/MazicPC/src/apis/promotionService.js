import axiosClient from "./axiosClient";

const getPromotions = async () => {
  const res = await axiosClient.get("promotions");
  return res.data;
};

const getPromotionsByType = async (type) => {
  const res = await axiosClient.get("promotions", {
    params: { type },
  });
  return res.data;
};

const getPromotion = async (id) => {
  const res = await axiosClient.get(`promotions/${id}`);
  return res.data;
};

const createPromotion = async (promotion) => {
  const res = await axiosClient.post("promotions", promotion);
  return res.data;
};

const updatePromotion = async (promotion) => {
  await axiosClient.put(`promotions/${promotion.id}`, promotion);
};

const deletePromotion = async (id) => {
  await axiosClient.delete(`promotions/${id}`);
};

const deletePromotions = async (ids) => {
  await axiosClient.delete("promotions/bulk", { data: ids });
};

// export object
const promotionService = {
  getPromotions,
  getPromotionsByType,
  getPromotion,
  createPromotion,
  updatePromotion,
  deletePromotion,
  deletePromotions,
};

export default promotionService;
