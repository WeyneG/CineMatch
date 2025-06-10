import { useState, useEffect } from 'react';
import { Genre } from '../types/movie';
import { movieService } from '../services/api';

interface UseGenresResult {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

export const useGenres = (): UseGenresResult => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const data = await movieService.getGenres();
        setGenres(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch genres');
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};