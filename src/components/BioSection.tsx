import { motion } from 'framer-motion';

const ASCIILink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative inline-block group"
  >
    <motion.span
      className="absolute -left-4 opacity-0 group-hover:opacity-100 font-mono text-amber-500 text-xs transition-opacity duration-200"
    >
      {'>'}{'>'} 
    </motion.span>
    <span className="relative text-white hover:text-amber-400 transition-colors duration-200 border-b border-dashed border-white/30 hover:border-amber-400/50">
      {children}
    </span>
    <motion.span
      className="absolute -bottom-1 left-0 font-mono text-[10px] text-amber-500/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      ───→
    </motion.span>
  </a>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const BioSection = () => {
  return (
    <section className="relative py-24 md:py-32">
      {/* ASCII section header */}
      <div className="max-w-3xl mx-auto px-6">
        <motion.pre
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/20 font-mono text-xs mb-12"
        >
          {'{'} about {'}'}
        </motion.pre>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 text-lg md:text-xl text-white/80 leading-[1.8]"
        >
          <motion.p variants={itemVariants}>
            hi. i'm ohm. a second year maths and computing student at{' '}
            <ASCIILink href="https://www.rfruas.edu.in/">ruas</ASCIILink>
            , trying to build a life around startups.
          </motion.p>

          <motion.p variants={itemVariants}>
            i spend my days in classes and problem sets, and my nights building small internet projects that solve my problems, writing raw notes about money, work, things i know / i don't, and the tools that keep me going.
          </motion.p>

          <motion.p variants={itemVariants}>
            last year i worked with{' '}
            <ASCIILink href="https://port.numberless.tech/">port, by numberless</ASCIILink>
            {' '}on marketing, design, copy, and early stage mess. now i'm slowly learning/helping founders and creators with landing pages, systems, and words that actually sound like them.
          </motion.p>

          <motion.p variants={itemVariants}>
            i like minimal interfaces, tasteful designs, and music. i shoot photos when i need to breathe and i write when i need to understand.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-4">
            <p className="text-white/50 font-mono text-sm mb-4">{'// right now i\'m:'}</p>
            <ul className="space-y-3 text-base md:text-lg">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-mono">•</span>
                <span>
                  building in public across{' '}
                  <ASCIILink href="https://twitter.com/arreyaarom">twitter</ASCIILink>,{' '}
                  <ASCIILink href="https://warpcast.com/ohm">farcaster</ASCIILink>, and{' '}
                  <ASCIILink href="https://www.linkedin.com/in/arreyaarom/">linkedin</ASCIILink>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-mono">•</span>
                <span>learning how to edit videos + photos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-mono">•</span>
                <span>
                  sometimes learning/helping daya, divyansh and charan in creating tasteful product videos{' '}
                  <ASCIILink href="#">(last cooking session)</ASCIILink>
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* ASCII bottom decoration */}
        <motion.pre
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/10 font-mono text-xs mt-16"
        >
          ─────────────────────────────────────────
        </motion.pre>
      </div>
    </section>
  );
};

export default BioSection;
