import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Events', href: '#events' },
    { label: 'Publications', href: '#publications' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass dark:glass-dark backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-display font-bold hover-underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-gradient">HG</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium hover:text-accent-teal dark:hover:text-accent-teal transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-accent-teal/0 via-accent-teal/70 to-accent-teal/0 dark:from-accent-teal/0 dark:via-accent-teal/70 dark:to-accent-teal/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'hover:bg-white/10 dark:hover:bg-black/10'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-accent-teal" />
              ) : (
                <FiMoon className="w-5 h-5 text-primary-600" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass dark:glass-dark backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 rounded-full text-base font-medium hover:text-accent-teal dark:hover:text-accent-teal transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  toggleDarkMode();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-full text-base font-medium hover:text-accent-teal dark:hover:text-accent-teal transition-colors"
                whileHover={{ x: 10 }}
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;