import React, { useEffect, useState } from 'react';
import { MovieDetails as MovieDetailsType, Movie } from '../types/movie';
import { Star, Clock, Calendar, X, BookmarkPlus, BookmarkCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface MovieDetailsProps {
  movie: MovieDetailsType;
  recommendations: Movie[];
  onClose: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: (movie: Movie, event: React.MouseEvent) => void;
  onMovieClick: (movie: Movie) => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  recommendations,
  onClose,
  isBookmarked,
  onBookmarkToggle,
  onMovieClick,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(recommendations.length / itemsPerPage);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmarkToggle(movie, e);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Poster';

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Desconhecida';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const visibleRecommendations = recommendations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen py-8 px-4 sm:px-6">
        <div className="bg-dark rounded-xl max-w-6xl mx-auto overflow-hidden shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-opacity z-10"
            aria-label="Fechar detalhes"
          >
            <X size={24} />
          </button>
          
          {backdropUrl && (
            <div className="relative h-[40vh] sm:h-[50vh]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backdropUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row items-end sm:items-end gap-6">
                <img 
                  src={posterUrl}
                  alt={movie.title}
                  className="w-32 sm:w-48 rounded-lg shadow-lg border-2 border-dark-light"
                />
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {movie.title}
                  </h1>
                  {movie.tagline && (
                    <p className="text-gray-300 text-lg italic mb-4">{movie.tagline}</p>
                  )}
                  <div className="flex flex-wrap gap-3 text-sm">
                    {movie.genres.map((genre) => (
                      <span 
                        key={genre.id}
                        className="bg-dark-light text-gray-200 px-3 py-1 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="p-6 sm:p-8">
            {/* Movie Info Section with better spacing */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center text-primary">
                <Star size={20} className="mr-2" />
                <span className="text-white font-semibold text-lg">
                  {movie.vote_average.toFixed(1)} / 10
                </span>
              </div>
              
              {movie.runtime > 0 && (
                <div className="flex items-center text-gray-400">
                  <Clock size={20} className="mr-2" />
                  <span className="text-base">{formatRuntime(movie.runtime)}</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-400">
                <Calendar size={20} className="mr-2" />
                <span className="text-base">{formatDate(movie.release_date)}</span>
              </div>
            </div>

            {/* Watchlist Button - Separated and better positioned */}
            <div className="mb-8">
              <button
                onClick={handleWatchlistClick}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium text-base transition-all duration-300 transform hover:scale-105 ${
                  isBookmarked 
                    ? 'bg-primary text-dark hover:bg-primary-light shadow-[0_0_20px_rgba(255,215,0,0.3)]' 
                    : 'bg-dark-light text-white hover:bg-dark-lighter border border-gray-600 hover:border-primary'
                }`}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck size={20} />
                    <span>Adicionado à Lista</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus size={20} />
                    <span>Quero Assistir</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Synopsis Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Sinopse</h2>
              <p className="text-gray-300 leading-relaxed text-base">
                {movie.overview || "Sinopse não disponível."}
              </p>
            </div>
            
            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">Você Também Pode Gostar</h2>
                  {totalPages > 1 && (
                    <div className="flex gap-2">
                      <button
                        onClick={prevPage}
                        className="p-3 bg-dark-light rounded-full hover:bg-dark-lighter transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage === 0}
                      >
                        <ChevronLeft size={20} className="text-white" />
                      </button>
                      <button
                        onClick={nextPage}
                        className="p-3 bg-dark-light rounded-full hover:bg-dark-lighter transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage === totalPages - 1}
                      >
                        <ChevronRight size={20} className="text-white" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {visibleRecommendations.map((recommendation) => (
                    <MovieCard
                      key={recommendation.id}
                      movie={recommendation}
                      onClick={onMovieClick}
                      showBookmarkButton={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;