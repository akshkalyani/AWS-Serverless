import { useState, useEffect } from 'react';
import { fetchCoaches } from '../services/coachesService';

function useFetchCoaches() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCoaches = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCoaches();
        setData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch coaches');
      } finally {
        setLoading(false);
      }
    };

    getCoaches();
  }, []);

  return { data, loading, error };
}

export default useFetchCoaches;
