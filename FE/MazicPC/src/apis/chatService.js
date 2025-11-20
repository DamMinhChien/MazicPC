import axiosClient from "./axiosClient";

export default async (message) => {
  const res = await axiosClient.post("Chat", { message }, {timeout: 60000 });
  return res.data;
};
