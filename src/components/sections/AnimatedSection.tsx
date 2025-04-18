import React from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import { Tilt } from 'react-tilt';
import { useInView } from 'react-intersection-observer';

const AnimatedSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="min-h-screen py-20 bg-mesh relative overflow-hidden">
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4">
        {/* Animated Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Interactive Experience
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Tilt Card */}
          <Tilt className="tilt-card p-8" options={{ max: 25, scale: 1.05 }}>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-gradient">Tilt Effect</h3>
              <p className="text-slate-600 dark:text-slate-300">
                This card smoothly tilts as you hover over it, creating an engaging 3D effect
                that responds to your mouse movement.
              </p>
            </motion.div>
          </Tilt>

          {/* Parallax Card */}
          <div className="parallax-wrapper rounded-2xl overflow-hidden">
            <Parallax
              blur={0}
              bgImage="/path-to-your-image.jpg"
              strength={200}
              className="h-full min-h-[300px] rounded-2xl"
            >
              <div className="relative h-full min-h-[300px] flex items-center justify-center">
                <div className="glass p-8 rounded-xl max-w-md mx-auto">
                  <h3 className="text-2xl font-semibold mb-4">Parallax Scrolling</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Experience smooth parallax scrolling effects that add depth and
                    dimension to your viewing experience.
                  </p>
                </div>
              </div>
            </Parallax>
          </div>
        </div>

        {/* Animated Cards */}
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="spring-scale h-full">
                <div className="glow h-full">
                  <h3 className="text-xl font-semibold mb-4 text-shadow">
                    Interactive Card {i}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Hover to experience multiple effects: scaling, glowing borders,
                    and smooth transitions.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Button */}
        <motion.button
          className="btn-3d bg-blue-600 text-white px-8 py-4 rounded-xl mx-auto mt-16 block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Interact with me
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedSection; 