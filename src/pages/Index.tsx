import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';

const Index = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(20);
  const [theme] = useState(() => Math.random() > 0.5 ? 'dark' : 'light');

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setCursorSize(40);
    const handleMouseLeave = () => setCursorSize(20);

    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const gradientStyles = {
    dark: {
      background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.3) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,1) 100%)',
      cursorColor: 'rgba(59,130,246,0.2)'
    },
    light: {
      background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(249,115,22,0.2) 0%, rgba(255,247,237,0.95) 45%, rgba(255,247,237,1) 100%)',
      cursorColor: 'rgba(249,115,22,0.2)'
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-[#f3f3f3]'}`}>
      {/* Dynamic gradient background with pointer-events-none removed */}
      <div 
        className="absolute inset-0 animate-gradient"
        style={{
          background: gradientStyles[theme].background,
          backgroundSize: '200% 200%',
          animation: 'moveGradient 20s linear infinite',
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty('--x', `${x}%`);
          e.currentTarget.style.setProperty('--y', `${y}%`);
        }}
      />
      
      {/* Noise overlay */}
      <div 
        className="fixed inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Custom cursor */}
      <div 
        className="custom-cursor hidden md:block"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)`,
          position: 'fixed',
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          backgroundColor: gradientStyles[theme].cursorColor,
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'width 0.2s, height 0.2s, transform 0.1s ease-out',
          backdropFilter: 'blur(4px)',
          zIndex: 50
        }}
      />

      <Header theme={theme} />
      <MainContent theme={theme} />
      <Footer theme={theme} />
    </div>
  );
};

export default Index;