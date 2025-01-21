import { motion } from 'framer-motion';

const Header = ({ theme }: { theme: 'dark' | 'light' }) => (
  <header className="w-full p-6 z-10 relative">
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-2xl font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
    >
      Ohm.
    </motion.h1>
  </header>
);

export default Header;