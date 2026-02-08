import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const asciiArt = `
 ██████╗ ██╗  ██╗███╗   ███╗
██╔═══██╗██║  ██║████╗ ████║
██║   ██║███████║██╔████╔██║
██║   ██║██╔══██║██║╚██╔╝██║
╚██████╔╝██║  ██║██║ ╚═╝ ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝
`;

const ASCIILoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const chars = asciiArt.split('');
    
    const typeInterval = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayedText(chars.slice(0, currentIndex + 1).join(''));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setIsComplete(true), 500);
      }
    }, 8); // Fast typewriter effect

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Gradient wipe effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent origin-left"
      />
      
      <div className="relative">
        <pre className="font-mono text-white text-[8px] sm:text-xs md:text-sm lg:text-base leading-tight tracking-tight">
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-amber-500"
          >
            █
          </motion.span>
        </pre>
        
        {/* Subtle glow effect */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 blur-2xl bg-blue-500/20 -z-10"
        />
      </div>
    </motion.div>
  );
};

export default ASCIILoadingScreen;
