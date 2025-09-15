import { motion } from 'framer-motion';

const MainContent = ({ theme }: { theme: 'dark' | 'light' }) => (
  <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 relative z-10">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-3xl md:text-4xl font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-8`}
    >
      20, awake & figuring it out.
    </motion.h1>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`text-lg md:text-xl ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} space-y-6`}
    >
      <p>
        hi, i'm Om.{' '}
        <a href="https://www.linkedin.com/in/arreyaarom/recent-activity/all/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="link-underline">
          writing
        </a>
        , reading & learning how to tell stories that hit. check out my{' '}
        <a href="/blog" 
           className="link-underline">
          blog
        </a>
        {' '}for late-night thoughts and random insights. spent the last year with{' '}
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
    </motion.div>
  </div>
);

export default MainContent;
