import axios from 'axios';
import axiosInstance from './axiosInstance';

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  target: string;
  preferredActivity: string;
}

const BASE_URL = 'https://fitbudd-run4team3-fitbudd-develop-dev.shared.edp-dev.cloudmentor.academy';


export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axiosInstance.post(`/api/v1/client/register`, data);
    console.log("REGISTER RESPONSE", response);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/api/v1/client/login`, { email, password });
    console.log("LOGIN RESPONSE", response);
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const updateUser = async (data: Partial<RegisterData>, token: string) => {
  try {
    const response = await axiosInstance.put(`/api/v1/client/profile/update`, data, {
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
    const response = await axios.put(`${BASE_URL}/api/v1/update/password`, data, {
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