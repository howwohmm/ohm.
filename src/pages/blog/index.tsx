import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Sample Blog Post",
    date: "March 1, 2024",
    excerpt: "This is a sample blog post to demonstrate the layout. You can add your actual blog posts here.",
    link: "/blog/sample-post"
  },
  // Add more blog posts here
];

const Blog = () => {
  const theme = 'dark';
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(20);

  useEffect(() => {
    // Redirect to the blog subdomain
    window.location.href = 'https://blog.ohmis.me';
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      // Update gradient position globally
      const root = document.documentElement;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty('--x', `${x}%`);
      root.style.setProperty('--y', `${y}%`);
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
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Dynamic gradient background */}
      <div 
        className="absolute inset-0 animate-gradient pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.3) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,1) 100%)',
          backgroundSize: '200% 200%',
          animation: 'moveGradient 20s linear infinite',
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
          backgroundColor: 'rgba(59,130,246,0.2)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'width 0.2s, height 0.2s, transform 0.1s ease-out',
          backdropFilter: 'blur(4px)',
          zIndex: 50
        }}
      />

      <Header theme={theme} />
      
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 relative z-10 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Redirecting to blog...</p>
        </motion.div>
      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default Blog; 