import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMovies } from '../hooks/useMovies';
import { useGenres } from '../hooks/useGenres';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useWatchlist } from '../hooks/useWatchlist';
import { Movie } from '../types/movie';
import Header from '../components/Header';
import GenreFilter from '../components/GenreFilter';
import MovieGrid from '../components/MovieGrid';
import MovieDetails from '../components/MovieDetails';
import LoadMoreButton from '../components/LoadMoreButton';

const HomePage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [showingWatchlist, setShowingWatchlist] = useState(false);
  
  const { 
    movies, 
    loading, 
    error,
    totalPages,
    currentPage,
    fetchNextPage,
    searchMovies,
    fetchPopularMovies,
    fetchMoviesByGenre
  } = useMovies();
  
  const { genres } = useGenres();
  const { movie, recommendations, loading: detailsLoading } = useMovieDetails(selectedMovieId);
  const { watchlist, isInWatchlist, toggleWatchlistItem } = useWatchlist();

  const contentRef = useRef<HTMLDivElement>(null);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovieId(movie.id);
  }, []);

  const handleWatchlistToggle = useCallback((movie: Movie, event: React.MouseEvent) => {
    event.stopPropagation();
    toggleWatchlistItem(movie);
  }, [toggleWatchlistItem]);

  const handleGenreSelect = useCallback((genreId: number | null) => {
    setSelectedGenre(genreId);
    setShowingWatchlist(false);
    
    if (genreId) {
      fetchMoviesByGenre(genreId);
    } else {
      fetchPopularMovies();
    }
    
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [fetchMoviesByGenre, fetchPopularMovies]);

  const handleSearch = useCallback((query: string) => {
    searchMovies(query);
    setShowingWatchlist(false);
    setSelectedGenre(null);
  }, [searchMovies]);

  const handleShowWatchlist = useCallback(() => {
    setShowingWatchlist(prev => !prev);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showingWatchlist]);

  const displayedMovies = showingWatchlist ? watchlist : movies;

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header 
        onSearch={handleSearch}
        onShowWatchlist={handleShowWatchlist}
        isShowingWatchlist={showingWatchlist}
        watchlistCount={watchlist.length}
      />
      
      <main className="container mx-auto px-4 pt-24 pb-12" ref={contentRef}>
        {!showingWatchlist && (
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={handleGenreSelect}
          />
        )}
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">
            {showingWatchlist 
              ? 'Minha Lista para Assistir'
              : selectedGenre
                ? genres.find(g => g.id === selectedGenre)?.name || 'Filmes'
                : 'Filmes Populares'
            }
          </h2>
          
          {error && (
            <div className="bg-red-900 text-white p-4 rounded-lg mb-6">
              Erro ao carregar os filmes. Por favor, tente novamente.
            </div>
          )}
          
          <MovieGrid
            movies={displayedMovies}
            onMovieClick={handleMovieClick}
            isBookmarked={isInWatchlist}
            onBookmarkToggle={handleWatchlistToggle}
            loading={loading}
          />
          
          {!showingWatchlist && (
            <LoadMoreButton
              onClick={fetchNextPage}
              loading={loading}
              hasMore={currentPage < totalPages}
            />
          )}
          
          {showingWatchlist && watchlist.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-gray-400 text-lg mb-4">
                Você ainda não adicionou nenhum filme à sua lista.
              </p>
              <button
                onClick={() => {
                  setShowingWatchlist(false);
                  fetchPopularMovies();
                }}
                className="px-6 py-2 bg-primary text-dark font-medium rounded-full hover:bg-primary-light transition-colors"
              >
                Explorar Filmes Populares
              </button>
            </div>
          )}
        </div>
      </main>
      
      {selectedMovieId && movie && !detailsLoading && (
        <MovieDetails
          movie={movie}
          recommendations={recommendations}
          onClose={() => setSelectedMovieId(null)}
          isBookmarked={isInWatchlist(movie.id)}
          onBookmarkToggle={handleWatchlistToggle}
          onMovieClick={handleMovieClick}
        />
      )}
    </div>
  );
};

export default HomePage;