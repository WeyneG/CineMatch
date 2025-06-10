import React, { useState, useEffect } from 'react';
import { Film, BookmarkPlus } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeaderProps {
  onSearch: (query: string) => void;
  onShowWatchlist: () => void;
  isShowingWatchlist: boolean;
  watchlistCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  onShowWatchlist, 
  isShowingWatchlist,
  watchlistCount 
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 backdrop-blur-md ${
        scrolled ? 'bg-dark/90 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-primary via-primary-light to-primary bg-[length:200%_auto] animate-gradient">
              <Film size={28} className="text-dark" />
              <h1 className="text-xl font-bold text-dark px-2">
                CINEMATCH
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <SearchBar onSearch={onSearch} />
            
            <button 
              onClick={onShowWatchlist}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-dark-light hover:bg-dark-lighter transition-all duration-300 group"
              aria-label="Mostrar lista para assistir"
            >
              <BookmarkPlus size={18} className={`transition-colors duration-300 ${isShowingWatchlist ? "text-primary" : "text-white group-hover:text-primary"}`} />
              <span className={`hidden sm:block transition-colors duration-300 ${isShowingWatchlist ? "text-primary" : "text-white group-hover:text-primary"}`}>
                Quero Assistir
              </span>
              {watchlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {watchlistCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;