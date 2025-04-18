import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-dark-300 dark:via-dark-200 dark:to-dark-100" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] dark:opacity-[0.1]" />
      
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
      />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-700 via-primary-600 to-accent-teal opacity-30 animate-spin-slow" />
              <img
                src="/events-photos/profile-photo.jpeg"
                alt="Hakan Gök"
                className="w-full h-full rounded-full object-cover"
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
              <p className="text-xl sm:text-2xl text-primary-900 dark:text-primary-100 leading-relaxed font-display">
                Software Engineer
              </p>
              <p className="text-lg text-primary-700 dark:text-primary-300 mt-4">
                Passionate about creating elegant solutions to complex problems through innovative software development
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
            >
              <FiMail className="w-5 h-5" />
              Contact Me
              <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a 
                href="https://github.com/hakangokdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/90 dark:bg-dark-200/90 border border-primary-200/30 dark:border-primary-700/30 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <FiGithub className="w-5 h-5 text-primary-800 dark:text-primary-300" />
              </a>
              <a 
                href="https://linkedin.com/in/gokhakan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/90 dark:bg-dark-200/90 border border-primary-200/30 dark:border-primary-700/30 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <FiLinkedin className="w-5 h-5 text-primary-800 dark:text-primary-300" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;