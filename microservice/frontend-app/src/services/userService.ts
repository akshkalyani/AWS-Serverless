import axios from 'axios';

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  target: string;
  preferableActivity: string;
}

const BASE_URL = "https://gymapp-run4team1-dotnet-dev.shared.edp-dev.cloudmentor.academy";


export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user`, data);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, { email, password });
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const updateUser = async (data: Partial<RegisterData>, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const updatePassword = async (data: object, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/change-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};