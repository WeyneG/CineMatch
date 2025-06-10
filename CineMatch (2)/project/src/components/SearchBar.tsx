import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      onSearch(newQuery);
    }, 500);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`relative w-full max-w-md transition-all duration-300 ${
        isFocused ? 'ring-2 ring-primary' : ''
      }`}
    >
      <div className="relative flex items-center bg-dark-light rounded-full overflow-hidden">
        <Search 
          className="absolute left-3 text-gray-400" 
          size={18} 
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar filmes..."
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-dark-light pl-10 pr-10 py-2 text-white placeholder-gray-400 outline-none rounded-full"
        />
        {query && (
          <button 
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-white transition-colors"
            aria-label="Limpar busca"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;