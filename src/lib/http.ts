import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject({
        status,
        message: data?.message || error.message,
        data,
      });
    }
    if (error.request) {
      return Promise.reject({
        status: 0,
        message: "Network error or no response received",
      });
    }
    return Promise.reject({
      status: 0,
      message: error.message || "Unexpected error",
    });
  }
);
