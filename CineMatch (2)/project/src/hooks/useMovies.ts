import { useState, useEffect, useCallback } from 'react';
import { Movie, MovieSearchResponse } from '../types/movie';
import { movieService } from '../services/api';

interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchNextPage: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  fetchPopularMovies: () => Promise<void>;
  fetchTopRatedMovies: () => Promise<void>;
  fetchMoviesByGenre: (genreId: number) => Promise<void>;
}

export const useMovies = (): UseMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentRequest, setCurrentRequest] = useState<
    'popular' | 'topRated' | 'search' | 'genre'
  >('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentGenreId, setCurrentGenreId] = useState<number | null>(null);

  const handleResponse = (response: MovieSearchResponse, reset: boolean = true) => {
    if (reset) {
      setMovies(response.results);
    } else {
      setMovies((prev) => [...prev, ...response.results]);
    }
    setTotalPages(response.total_pages);
    setCurrentPage(response.page);
    setLoading(false);
  };

  const fetchPopularMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setCurrentRequest('popular');
      const response = await movieService.getPopularMovies(1);
      handleResponse(response);
    } catch (err) {
      setError('Failed to fetch popular movies');
      setLoading(false);
    }
  }, []);

  const fetchTopRatedMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setCurrentRequest('topRated');
      const response = await movieService.getTopRatedMovies(1);
      handleResponse(response);
    } catch (err) {
      setError('Failed to fetch top rated movies');
      setLoading(false);
    }
  }, []);

  const searchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      fetchPopularMovies();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearchQuery(query);
      setCurrentRequest('search');
      const response = await movieService.searchMovies(query, 1);
      handleResponse(response);
    } catch (err) {
      setError('Failed to search movies');
      setLoading(false);
    }
  }, [fetchPopularMovies]);

  const fetchMoviesByGenre = useCallback(async (genreId: number) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentGenreId(genreId);
      setCurrentRequest('genre');
      const response = await movieService.getMoviesByGenre(genreId, 1);
      handleResponse(response);
    } catch (err) {
      setError('Failed to fetch movies by genre');
      setLoading(false);
    }
  }, []);

  const fetchNextPage = useCallback(async () => {
    if (currentPage >= totalPages || loading) return;

    try {
      setLoading(true);
      let response: MovieSearchResponse;

      if (currentRequest === 'popular') {
        response = await movieService.getPopularMovies(currentPage + 1);
      } else if (currentRequest === 'topRated') {
        response = await movieService.getTopRatedMovies(currentPage + 1);
      } else if (currentRequest === 'search') {
        response = await movieService.searchMovies(searchQuery, currentPage + 1);
      } else {
        // genre
        response = await movieService.getMoviesByGenre(currentGenreId!, currentPage + 1);
      }

      handleResponse(response, false);
    } catch (err) {
      setError('Failed to fetch more movies');
      setLoading(false);
    }
  }, [currentPage, totalPages, loading, currentRequest, searchQuery, currentGenreId]);

  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  return {
    movies,
    loading,
    error,
    totalPages,
    currentPage,
    fetchNextPage,
    searchMovies,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchMoviesByGenre,
  };
};