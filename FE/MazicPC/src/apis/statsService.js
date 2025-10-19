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

const statsService = {
  getTotals,
  getTotalsAdmin,
  getStatisticByCategory,
  getStatisticByManufacturer,
};

export default statsService;
