// axiosInstance.ts
import axios, { AxiosInstance } from "axios";

// Create an Axios instance with the base URL and headers
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://gymapp-run4team1-dotnet-dev.shared.edp-dev.cloudmentor.academy",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
