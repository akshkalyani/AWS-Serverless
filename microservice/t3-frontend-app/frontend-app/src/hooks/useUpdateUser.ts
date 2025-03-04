import { useState } from 'react';
import { updateUser } from '../services/userService';
import { RegisterData } from '../services/userService';
import { AxiosResponse } from 'axios';

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");


  const update = async (data: Partial<RegisterData>): Promise<AxiosResponse> => {
    if (!token) {
      throw new Error('No auth token found');
    }

    setLoading(true);
    try {
      const response = await updateUser(data, token);
      return response;
    } catch (err) {
      setError('Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

export default useUpdateUser; 