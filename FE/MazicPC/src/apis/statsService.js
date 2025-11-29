import axiosClient from "./axiosClient";

const getTotals = async () => {
  const res = await axiosClient.get("stats/totals");
  return res.data;
};

const getTotalsAdmin = async () => {
  const res = await axiosClient.get("stats/totalsAdmin");
  return res.data;
};

const getStatisticByCategory = async () => {
  const res = await axiosClient.get("stats/category-statistics");
  return res.data;
};

const getStatisticByManufacturer = async () => {
  const res = await axiosClient.get("stats/manufacturer-statistics");
  return res.data;
};

const getRevenueByWeek = async () => {
  const res = await axiosClient.get("stats/revenue-by-week");
  return res.data;
}

const getRevenue = async () => {
  const res = await axiosClient.get("stats/revenue");
  return res.data;
}

const getRevenueByCategoryData = async () => {
  const res = await axiosClient.get("stats/revenue-by-category");
  return res.data;
}

const statsService = {
  getTotals,
  getTotalsAdmin,
  getStatisticByCategory,
  getStatisticByManufacturer,
  getRevenue,
  getRevenueByWeek,
  getRevenueByCategoryData,
};

export default statsService;
