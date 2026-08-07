 import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL:"http://localhost:3030",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================
// Request Interceptor
// =====================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =====================
// Response Interceptor
// =====================
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    // Network error
    if (!error.response) {
      toast.error(
        "Unable to connect to the server. Please check your internet connection."
      );
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const message = data?.message || data?.msg || "Something went wrong.";

    switch (status) {
      case 400:
        toast.error(message);
        break;

      case 401:
        toast.error("Session expired. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        localStorage.removeItem("name");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);

        break;

      case 403:
        toast.error("You are not authorized to perform this action.");
        break;

      case 404:
        toast.error(message || "Resource not found.");
        break;

      case 409:
        toast.error(message);
        break;

      case 422:
        toast.error(message);
        break;

      case 429:
        toast.error("Too many requests. Please try again later.");
        break;

      case 500:
        toast.error("Internal server error. Please try again later.");
        break;

      case 502:
      case 503:
      case 504:
        toast.error("Server is temporarily unavailable.");
        break;

      default:
        toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;