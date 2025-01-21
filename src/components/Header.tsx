import { motion } from 'framer-motion';

const Header = () => (
  <header className="w-full p-6 text-white z-10 relative">
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl font-medium"
    >
      Ohm.
    </motion.h1>
  </header>
);

export default Header;