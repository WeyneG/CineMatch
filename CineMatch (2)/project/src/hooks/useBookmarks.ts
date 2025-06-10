import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types/movie';

interface UseBookmarksResult {
  bookmarks: Movie[];
  isBookmarked: (movieId: number) => boolean;
  toggleBookmark: (movie: Movie) => void;
}

export const useBookmarks = (): UseBookmarksResult => {
  const [bookmarks, setBookmarks] = useState<Movie[]>([]);

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const storedBookmarks = localStorage.getItem('movieBookmarks');
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks));
      } catch (error) {
        console.error('Failed to parse bookmarks from localStorage:', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movieBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (movieId: number): boolean => {
      return bookmarks.some((bookmark) => bookmark.id === movieId);
    },
    [bookmarks]
  );

  const toggleBookmark = useCallback((movie: Movie) => {
    setBookmarks((prevBookmarks) => {
      const isAlreadyBookmarked = prevBookmarks.some((bookmark) => bookmark.id === movie.id);
      
      if (isAlreadyBookmarked) {
        return prevBookmarks.filter((bookmark) => bookmark.id !== movie.id);
      } else {
        return [...prevBookmarks, movie];
      }
    });
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark };
};