import { useState, useEffect } from 'react';
import { MovieDetails, Movie } from '../types/movie';
import { movieService } from '../services/api';

interface UseMovieDetailsResult {
  movie: MovieDetails | null;
  recommendations: Movie[];
  loading: boolean;
  error: string | null;
}

export const useMovieDetails = (movieId: number | null): UseMovieDetailsResult => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [movieData, recommendationsData] = await Promise.all([
          movieService.getMovieDetails(movieId),
          movieService.getMovieRecommendations(movieId),
        ]);
        
        setMovie(movieData);
        setRecommendations(recommendationsData.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movie, recommendations, loading, error };
};