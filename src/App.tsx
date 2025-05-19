import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Publications from './components/sections/Publications';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Events from './components/sections/Events';
import Education from './components/sections/Education';
function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check user's preferred color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    // Add dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Events />
            <Publications />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
