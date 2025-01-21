import { motion } from 'framer-motion';

const MainContent = () => (
  <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 relative z-10">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-medium text-white mb-8"
    >
      20, awake & figuring it out.
    </motion.h1>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-lg md:text-xl text-gray-100 space-y-6"
    >
      <p>
        hi, i'm Om.{' '}
        <a href="https://www.linkedin.com/in/arreyaarom/recent-activity/all/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-underline">
          writing
        </a>
        , reading & learning how to tell stories that hit. spent the last year with{' '}
        <a href="https://port.numberless.tech/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-underline">
          Port by Numberless
        </a>
        , doing marketing, design, copywriting & all that startup chaos.
      </p>

      <p>
        first-year comp sci student at RUAS, figuring out how to build stuff from scratch. 
        I love minimal designs and aesthetics. trying my hand at copywriting & UI/UX along the way :)
      </p>

      <p className="flex flex-wrap gap-4 pt-4">
        <a href="https://www.instagram.com/ohmdreams/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-hover">
          ig
        </a>
        <span className="text-gray-300">||</span>
        <a href="https://www.linkedin.com/in/arreyaarom/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-hover">
          Li
        </a>
        <span className="text-gray-300">||</span>
        <a href="https://open.spotify.com/playlist/2ks8peOUXIYq05qH2lq9v3" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-hover">
          music
        </a>
        <span className="text-gray-300">||</span>
        <a href="https://www.instagram.com/teendandiyan/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-hover">
          photography
        </a>
      </p>
    </motion.div>
  </div>
);

export default MainContent;