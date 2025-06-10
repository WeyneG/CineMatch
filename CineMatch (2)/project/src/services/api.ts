import axios from 'axios';
import { MovieSearchResponse, MovieDetails, Genre } from '../types/movie';

const API_KEY = '08dfe5a9ea656f4ff8ebd16c13db5b2f';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const movieService = {
  getPopularMovies: async (page = 1): Promise<MovieSearchResponse> => {
    const response = await api.get<MovieSearchResponse>('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  getTopRatedMovies: async (page = 1): Promise<MovieSearchResponse> => {
    const response = await api.get<MovieSearchResponse>('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  },

  searchMovies: async (query: string, page = 1): Promise<MovieSearchResponse> => {
    const response = await api.get<MovieSearchResponse>('/search/movie', {
      params: { query, page },
    });
    
    // Sort results by vote_average in descending order (highest rated first)
    const sortedResults = response.data.results.sort((a, b) => b.vote_average - a.vote_average);
    
    return {
      ...response.data,
      results: sortedResults
    };
  },

  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const response = await api.get<MovieDetails>(`/movie/${id}`);
    return response.data;
  },

  getMovieRecommendations: async (id: number): Promise<MovieSearchResponse> => {
    const response = await api.get<MovieSearchResponse>(`/movie/${id}/recommendations`);
    return response.data;
  },

  getGenres: async (): Promise<Genre[]> => {
    const response = await api.get<{ genres: Genre[] }>('/genre/movie/list');
    return response.data.genres;
  },

  getMoviesByGenre: async (genreId: number, page = 1): Promise<MovieSearchResponse> => {
    const response = await api.get<MovieSearchResponse>('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  },
};