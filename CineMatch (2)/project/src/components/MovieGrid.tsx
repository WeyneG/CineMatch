import React from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  isBookmarked: (movieId: number) => boolean;
  onBookmarkToggle: (movie: Movie) => void;
  loading: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  onMovieClick, 
  isBookmarked, 
  onBookmarkToggle,
  loading
}) => {
  if (loading && movies.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-700 h-[300px] rounded-lg mb-2"></div>
            <div className="bg-gray-700 h-6 rounded w-3/4 mb-2"></div>
            <div className="bg-gray-700 h-4 rounded w-1/4 mb-2"></div>
            <div className="bg-gray-700 h-4 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-400 text-lg">Nenhum filme encontrado. Tente uma busca diferente.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
          isBookmarked={isBookmarked(movie.id)}
          onBookmarkToggle={onBookmarkToggle}
          showBookmarkButton={true}
        />
      ))}
      
      {loading && (
        Array.from({ length: 5 }).map((_, index) => (
          <div key={`loader-${index}`} className="animate-pulse">
            <div className="bg-gray-700 h-[300px] rounded-lg mb-2"></div>
            <div className="bg-gray-700 h-6 rounded w-3/4 mb-2"></div>
            <div className="bg-gray-700 h-4 rounded w-1/4 mb-2"></div>
            <div className="bg-gray-700 h-4 rounded w-full"></div>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieGrid;