// axiosInstance.ts
import axios, { AxiosInstance } from "axios";

// Create an Axios instance with the base URL and headers
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://fitbudd-run4team3-fitbudd-develop-dev.shared.edp-dev.cloudmentor.academy",
  // baseURL: "https://fitbudd-run4team3-fitbudd-dev.shared.edp-dev.cloudmentor.academy",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
