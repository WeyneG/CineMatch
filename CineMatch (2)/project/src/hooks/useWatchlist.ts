import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types/movie';

interface WatchlistManager {
  watchlist: Movie[];
  isInWatchlist: (movieId: number) => boolean;
  toggleWatchlistItem: (movie: Movie) => void;
}

export const useWatchlist = (): WatchlistManager => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('movieWatchlist');
    if (storedWatchlist) {
      try {
        setWatchlist(JSON.parse(storedWatchlist));
      } catch (error) {
        console.error('Failed to parse watchlist from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = useCallback(
    (movieId: number): boolean => {
      return watchlist.some((item) => item.id === movieId);
    },
    [watchlist]
  );

  const toggleWatchlistItem = useCallback((movie: Movie) => {
    setWatchlist((prevWatchlist) => {
      const isAlreadyInList = prevWatchlist.some((item) => item.id === movie.id);
      
      if (isAlreadyInList) {
        return prevWatchlist.filter((item) => item.id !== movie.id);
      } else {
        return [...prevWatchlist, movie];
      }
    });
  }, []);

  return { watchlist, isInWatchlist, toggleWatchlistItem };
};