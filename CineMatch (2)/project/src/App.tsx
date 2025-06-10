import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

function App() {
  const [showHome, setShowHome] = useState(false);

  if (!showHome) {
    return <LandingPage onEnter={() => setShowHome(true)} />;
  }

  return (
    <div className="bg-dark min-h-screen">
      <HomePage />
    </div>
  );
}

export default App;