import React from 'react';
import { Film } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,215,0,0.2)_25%,rgba(255,215,0,0.2)_50%,transparent_50%,transparent_75%,rgba(255,215,0,0.2)_75%)] bg-[length:100px_100px] animate-[gradient_20s_linear_infinite]"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3 bg-gradient-to-r from-primary via-primary-light to-primary p-3 rounded-xl bg-[length:200%_auto] animate-gradient">
            <Film size={40} className="text-dark" />
            <h1 className="text-4xl font-bold text-dark">
              CINEMATCH
            </h1>
          </div>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          "Onde cada filme conta uma história, e cada história encontra seu espectador perfeito."
        </p>

        <div className="space-y-6">
          <p className="text-gray-400 max-w-xl mx-auto">
            Descubra novos filmes, explore gêneros e encontre suas próximas histórias favoritas em um só lugar.
          </p>

          <button
            onClick={onEnter}
            className="px-8 py-3 bg-primary text-dark font-bold rounded-full text-lg hover:bg-primary-light transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
          >
            Explorar Filmes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;