
import { useEffect } from 'react';

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized?: boolean;
      init?: () => void;
    };
  }
}

const UnicornStudioBackground = () => {
  useEffect(() => {
    // Load UnicornStudio script if not already loaded
    if (!window.UnicornStudio) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.27/dist/unicornStudio.umd.js';
      script.onload = () => {
        if (window.UnicornStudio && window.UnicornStudio.init && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      
      (document.head || document.body).appendChild(script);
    } else if (window.UnicornStudio.init && !window.UnicornStudio.isInitialized) {
      // If UnicornStudio is already loaded but not initialized
      window.UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
      }}
    >
      <div 
        data-us-project="6N0U4HCMzCtLWmYr1YvN" 
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default UnicornStudioBackground;
