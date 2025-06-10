import React from 'react';
import { Movie } from '../types/movie';
import { Star, BookmarkPlus, BookmarkCheck } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isBookmarked?: boolean;
  onBookmarkToggle?: (movie: Movie, event: React.MouseEvent) => void;
  showBookmarkButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onClick, 
  isBookmarked = false, 
  onBookmarkToggle,
  showBookmarkButton = true
}) => {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookmarkToggle) {
      onBookmarkToggle(movie, e);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Poster';

  const year = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'Desconhecido';

  return (
    <div 
      className="relative bg-dark-light rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer"
      onClick={() => onClick(movie)}
    >
      <div className="relative">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-[300px] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
        
        {/* Rating Badge - Always visible */}
        <div className="absolute top-2 left-2 flex items-center bg-dark/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star size={16} className="text-primary mr-1" />
          <span className="text-white text-sm font-medium">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Bookmark Button - Only show when enabled */}
        {showBookmarkButton && onBookmarkToggle && (
          <div className="absolute top-2 right-2">
            <button
              onClick={handleBookmarkClick}
              className="p-2 bg-dark/90 backdrop-blur-sm rounded-full text-white hover:bg-dark-light/90 transition-all duration-300 transform hover:scale-110"
              aria-label={isBookmarked ? "Remover da lista" : "Adicionar à lista"}
            >
              {isBookmarked ? (
                <BookmarkCheck size={18} className="text-primary" />
              ) : (
                <BookmarkPlus size={18} />
              )}
            </button>
          </div>
        )}

        {/* Movie Info - Always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark via-dark/95 to-transparent">
          <h3 className="text-white font-semibold text-lg leading-tight mb-1 line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-gray-300 text-sm mb-2">{year}</p>
          <p className="text-gray-400 text-sm line-clamp-2">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;