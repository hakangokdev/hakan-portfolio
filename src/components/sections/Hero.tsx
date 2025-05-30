import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center" aria-label="Hero section - Hakan Gök introduction">
      {/* Skip to main content link for accessibility */}
      <a href="#about" className="skip-link">Skip to main content</a>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-dark-300 dark:via-dark-200 dark:to-dark-100" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] dark:opacity-[0.1]" aria-hidden="true" />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 bg-primary-100 dark:bg-primary-800/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent-teal/20 dark:bg-accent-teal/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <div className="container relative">
        <header className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.1
            }}
            className="mb-8 relative inline-block"
          >
            <div className="w-36 h-36 rounded-full border-2 border-primary-700/30 p-1 backdrop-blur-sm relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-700 via-primary-600 to-accent-teal opacity-30 animate-spin-slow" aria-hidden="true" />
              <img
                src="/events-photos/profile-photo.jpeg"
                alt="Hakan Gök - Full-Stack Software Engineer specializing in React.js, JavaScript, TypeScript, and mobile development"
                className="w-full h-full rounded-full object-cover"
                loading="eager"
                width="144"
                height="144"
              />
            </div>
          </motion.div>

          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-800 via-primary-700 to-accent-teal dark:from-primary-300 dark:via-primary-400 dark:to-accent-teal font-display">
              Hakan Gök
            </h1>
            <div className="glass dark:glass-dark rounded-2xl p-6 mb-8 backdrop-blur-lg">
              <h2 className="text-xl sm:text-2xl text-primary-900 dark:text-primary-100 leading-relaxed font-display">
                Full-Stack Software Engineer
              </h2>
              <p className="text-lg text-primary-700 dark:text-primary-300 mt-4">
                React.js, JavaScript, TypeScript, MongoDB, MySQL uzmanı. Ankara merkezli yazılım geliştirici ve mobil uygulama geliştiricisi.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white bg-gradient-to-r from-primary-700 via-primary-600 to-accent-teal hover:from-primary-600 hover:via-primary-500 hover:to-accent-teal shadow-lg shadow-primary-700/25 hover:shadow-xl hover:shadow-primary-600/30 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="İletişim formuna git"
            >
              <FiMail className="w-5 h-5" aria-hidden="true" />
              Contact Me
              <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            
            <div className="flex gap-4 mt-4 sm:mt-0" role="list" aria-label="Social media links">
              <a 
                href="https://github.com/hakangokdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/90 dark:bg-dark-200/90 border border-primary-200/30 dark:border-primary-700/30 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Hakan Gök'ün GitHub profilini ziyaret et"
                role="listitem"
              >
                <FiGithub className="w-5 h-5 text-primary-800 dark:text-primary-300" aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com/in/gokhakan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/90 dark:bg-dark-200/90 border border-primary-200/30 dark:border-primary-700/30 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Hakan Gök'ün LinkedIn profilini ziyaret et"
                role="listitem"
              >
                <FiLinkedin className="w-5 h-5 text-primary-800 dark:text-primary-300" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </header>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Scroll down indicator"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-6 text-primary-700 dark:text-primary-400"
          aria-hidden="true"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;