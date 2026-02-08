import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient backgrounds */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-black to-transparent"
      />
      
      <motion.div
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        className="absolute inset-0 bg-gradient-to-tl from-amber-950/30 via-transparent to-transparent"
      />

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-2xl mx-auto px-6 text-center"
      >
        {/* ASCII top border */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/20 font-mono text-[10px] sm:text-xs mb-8 overflow-hidden"
        >
          ┌────────────────────────────────────────┐
        </motion.pre>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight"
        >
          Ohm.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-white/70 font-light"
        >
          20, awake & figuring it out.
        </motion.p>

        {/* ASCII bottom border */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-white/20 font-mono text-[10px] sm:text-xs mt-8 overflow-hidden"
        >
          └────────────────────────────────────────┘
        </motion.pre>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute left-1/2 bottom-8 -translate-x-1/2"
        >
          <motion.pre
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/30 font-mono text-xs"
          >
            ↓
          </motion.pre>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
