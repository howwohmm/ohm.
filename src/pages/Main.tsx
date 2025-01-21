import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { renderCanvas } from '../components/ui/canvas';
import { Instagram, Linkedin, QrCode } from 'lucide-react';

const Main = () => {
  useEffect(() => {
    renderCanvas();
  }, []);

  const navButtons = [
    { text: "Blogs", path: "/blogs" },
    { text: "Experiments", path: "/experiments" },
    { text: "Build with Me", path: "/build-with-me" }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      <canvas
        id="canvas"
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full p-6 flex justify-between items-center z-10"
      >
        <Link to="/main" className="text-2xl font-medium">ohm.</Link>
        <nav className="flex gap-8">
          {navButtons.map((button, index) => (
            <motion.div
              key={button.text}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={button.path}
                className="relative px-4 py-2 hover:scale-105 transition-transform
                         after:content-[''] after:absolute after:bottom-0 after:left-0 
                         after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 
                         after:origin-right after:transition-transform after:duration-300
                         hover:after:scale-x-100 hover:after:origin-left"
              >
                {button.text}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-32 px-6 max-w-4xl mx-auto relative z-10"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          20, awake & figuring it out.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 text-lg text-gray-300"
        >
          <p>
            hi, i'm Om. writing, reading & learning how to tell stories that hit. 
            spent the last year with Port by Numberless, doing marketing, design, 
            copywriting & all that startup chaos.
          </p>
          <p>
            first-year comp sci student at RUAS, figuring out how to build stuff from scratch. 
            I love minimal designs and aesthetics. trying my hand at copywriting & UI/UX along the way :)
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-6 mt-12"
        >
          <a href="https://instagram.com/ohmdreams" target="_blank" rel="noopener noreferrer"
             className="hover:text-blue-400 transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/arreyaarom" target="_blank" rel="noopener noreferrer"
             className="hover:text-blue-400 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <button className="hover:text-blue-400 transition-colors">
            <QrCode className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Main;