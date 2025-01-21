import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Experiments = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Link to="/main" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">← Back</Link>
        <h1 className="text-4xl font-bold mb-8">Experiments</h1>
        <p className="text-gray-400">Coming soon...</p>
      </motion.div>
    </div>
  );
};

export default Experiments;