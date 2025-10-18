import axiosClient from "./axiosClient";

const getTotals = async () => {
  const res = await axiosClient.get("stats/totals");
  return res.data;
};

const statsService = {
  getTotals,
};

export default statsService;
