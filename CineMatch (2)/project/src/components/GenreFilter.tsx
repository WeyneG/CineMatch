import React from 'react';
import { Genre } from '../types/movie';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ 
  genres, 
  selectedGenre, 
  onSelectGenre 
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectGenre(null)}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedGenre === null
              ? 'bg-primary text-dark'
              : 'bg-dark-lighter text-white hover:bg-dark-light'
          }`}
        >
          Todos
        </button>
        
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedGenre === genre.id
                ? 'bg-primary text-dark'
                : 'bg-dark-lighter text-white hover:bg-dark-light'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;