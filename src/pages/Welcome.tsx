import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { renderCanvas } from '../components/ui/canvas';

const Welcome = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <canvas
        id="canvas"
        className="absolute inset-0 pointer-events-none"
      />
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => navigate('/main')}
        className="relative z-10 px-8 py-4 text-xl bg-transparent border-2 border-blue-500 text-white rounded-full 
                 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      >
        Ready to enter Ohm's clan?
      </motion.button>
    </div>
  );
};

export default Welcome;