import { useEffect, useState } from 'react';
import api from '../api/axios.js';

export const useUsers = (params) => {
  const [data, setData] = useState({ users: [], pagination: { page: 1, pages: 1, total: 0, limit: 10 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/users', { params, signal: controller.signal });
        setData(response.data.data);
      } catch (requestError) {
        if (requestError.name !== 'CanceledError') {
          setError(requestError.response?.data?.message || 'Failed to load users');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUsers();

    return () => controller.abort();
  }, [params]);

  return { data, loading, error, setData };
};
