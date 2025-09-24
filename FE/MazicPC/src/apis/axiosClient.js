import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7094/api/",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default axiosClient;
