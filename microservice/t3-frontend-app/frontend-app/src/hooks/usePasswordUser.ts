import { useState } from 'react';
import { updatePassword } from '../services/userService';
import { AxiosResponse } from 'axios';

const usePasswordUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");


const updatePasswordUser = async (data: object): Promise<AxiosResponse> => {
    if (!token) {
      throw new Error('No auth token found');
    }

    setLoading(true);
    try {
      const response = await updatePassword(data, token);
      return response;
    } catch (err) {
      setError('Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updatePasswordUser, loading, error };
};

export default usePasswordUser; 