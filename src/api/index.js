import axios from "axios";
import { getCookie } from "../utils/cookie";

const connection = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    "Content-Type": "application/json",
    "Sec-Fetch-Mode": "cors",
  },
});

connection.interceptors.request.use(
  async (config) => {
    const storedToken = getCookie("accessToken");

    if (config.url === "/api/login") {
      return config;
    }

    if (!storedToken) {
      return Promise.reject(new Error("No access token found"));
    }

    config.headers.Authorization = `JWT ${storedToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

connection.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, config } = error;

    const errorMessage = response?.data || error.message || "An error occurred";

    if (response?.status === 401 && config?.url !== "/api/login") {
      window.location.href = "/login";
    }

    return Promise.reject(errorMessage);
  }
);

export default connection;
