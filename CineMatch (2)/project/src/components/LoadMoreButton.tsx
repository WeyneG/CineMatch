import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  hasMore: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  loading,
  hasMore,
}) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center my-8">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-6 py-2 bg-primary text-dark font-medium rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-dark\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
              <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Carregando...
          </div>
        ) : (
          'Carregar Mais'
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;