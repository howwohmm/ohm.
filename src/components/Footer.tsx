import { motion } from 'framer-motion';

const Footer = ({ theme }: { theme: 'dark' | 'light' }) => (
  <footer className={`absolute bottom-0 w-full p-6 text-center ${theme === 'dark' ? 'text-white/80' : 'text-gray-800/80'} z-10`}>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-sm md:text-base"
    >
      <motion.span
        animate={{ 
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`inline-block bg-gradient-to-r ${
          theme === 'dark' 
            ? 'from-blue-400 to-blue-600' 
            : 'from-orange-400 to-orange-600'
        } bg-clip-text text-transparent`}
      >
        inhale skills, exhale solutions
      </motion.span>
    </motion.p>
  </footer>
);

export default Footer;