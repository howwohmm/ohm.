import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = ({ theme }: { theme: 'dark' | 'light' }) => (
  <header className="w-full p-6 z-10 relative">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-2xl font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
      >
        Ohm.
      </motion.h1>
      
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <a href="https://www.instagram.com/ohmdreams/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-hover text-gray-100">
          ig
        </a>
        <span className="text-gray-300">||</span>
        <a href="https://www.linkedin.com/in/arreyaarom/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-hover text-gray-100">
          Li
        </a>
        <span className="text-gray-300">||</span>
        <a href="https://open.spotify.com/playlist/2ks8peOUXIYq05qH2lq9v3" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-hover text-gray-100">
          music
        </a>
        <span className="text-gray-300">||</span>
        <a href="https://www.instagram.com/teendandiyan/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-hover text-gray-100">
          photography
        </a>
        <span className="text-gray-300">||</span>
        <a href="https://blogv2-henna.vercel.app/" 
           className="link-hover text-gray-100">
          blog
        </a>
      </motion.nav>
    </div>
  </header>
);

export default Header;