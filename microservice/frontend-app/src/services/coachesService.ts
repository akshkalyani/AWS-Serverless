import axios from 'axios';

const BASE_URL = "https://gymapp-run4team1-dotnet-dev.shared.edp-dev.cloudmentor.academy";

export const fetchCoaches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coaches`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coaches:", error);
    throw error;
  }
};
