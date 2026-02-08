import { motion } from 'framer-motion';

const ASCIIFooter = () => {
  const socialLinks = [
    { name: 'twitter', url: 'https://twitter.com/arreyaarom' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/arreyaarom/' },
    { name: 'farcaster', url: 'https://warpcast.com/ohm' },
    { name: 'instagram', url: 'https://www.instagram.com/ohmdreams/' },
    { name: 'blog', url: 'https://blogv2-henna.vercel.app/' },
  ];

  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* ASCII decoration */}
        <motion.pre
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-white/15 mb-8"
        >
          ═══════════════════════════════════════
        </motion.pre>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group font-mono text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              <span className="text-white/30 group-hover:text-amber-500 transition-colors">[</span>
              {link.name}
              <span className="text-white/30 group-hover:text-amber-500 transition-colors">]</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <a
            href="mailto:arreyaarom@gmail.com"
            className="font-mono text-sm text-white/40 hover:text-amber-400 transition-colors duration-200"
          >
            {'>'} arreyaarom@gmail.com
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-white/30 text-xs font-mono"
        >
          © 2026 Ohm. Built with curiosity.
        </motion.p>

        {/* ASCII bottom decoration */}
        <motion.pre
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="font-mono text-[10px] text-white/10 mt-8"
        >
{`
     ╲ ╱
      ◆
     ╱ ╲
`}
        </motion.pre>
      </div>
    </footer>
  );
};

export default ASCIIFooter;
