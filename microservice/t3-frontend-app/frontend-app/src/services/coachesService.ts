
import axiosInstance from './axiosInstance';

export const fetchCoaches = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/coach/view`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coaches:", error);
    throw error;
  }
};
