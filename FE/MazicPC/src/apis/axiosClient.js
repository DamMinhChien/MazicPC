import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7094/api/",
  // baseURL: "https://overcontented-berniece-congressionally.ngrok-free.dev/api/",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default axiosClient;
