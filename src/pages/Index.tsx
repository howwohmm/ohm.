import { useEffect, useState } from 'react';
import ASCIILoadingScreen from '../components/ASCIILoadingScreen';
import HeroSection from '../components/HeroSection';
import BioSection from '../components/BioSection';
import ASCIIFooter from '../components/ASCIIFooter';

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already seen the loading screen this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenASCIILoading');
    if (hasSeenLoading) {
      setShowLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setHasLoaded(true);
    sessionStorage.setItem('hasSeenASCIILoading', 'true');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ASCII Loading Screen - only shows on first visit */}
      {showLoading && <ASCIILoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main content */}
      <main className={showLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <HeroSection />
        <BioSection />
        <ASCIIFooter />
      </main>
    </div>
  );
};

export default Index;
