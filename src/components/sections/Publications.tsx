import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiExternalLink, FiCalendar} from "react-icons/fi";
import { MediumArticle, loadMediumArticles } from "../../utils/mediumLoader";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface Project {
  title: string;
  link: string;
  pubDate: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "Pedestrian Traffic Light Detection System",
    link: "https://github.com/hakangokdev/Pedestrian-Traffic-Light-Detection",
    pubDate: "2025-04-01",
    github: "https://github.com/hakangokdev/Pedestrian-Traffic-Light-Detection"
  },
  {
    title: "Library Management System",
    link: "https://github.com/hakangokdev/Library-Management-System",
    pubDate: "2025-03-01",
    github: "https://github.com/hakangokdev/Library-Management-System"
  }
];

const Publications = () => {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Intersection Observer for lazy loading
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const mediumArticles = await loadMediumArticles();
      
      if (mediumArticles.length === 0) {
        console.warn("No Medium articles found - check the API response");
        setError("Couldn't load Medium articles at this time");
      } else {
        setArticles(mediumArticles);
        setError(null);
      }
    } catch (err) {
      console.error("Error loading Medium articles:", err);
      setError("Failed to load Medium articles");
    } finally {
      setIsLoading(false);
    }
  };

  // Lazy loading effect - sadece section görünür olduğunda çalış
  useEffect(() => {
    if (isIntersecting && !hasInitialized) {
      console.log("[Publications] Section is visible, loading articles");
      setHasInitialized(true);
      fetchArticles();
    }
  }, [isIntersecting, hasInitialized]);

  // Yükleme durumlarını yönetmek için
  const hasArticles = articles.length > 0;
  const showError = error && !hasArticles;
  const showEmptyState = !isLoading && !error && !hasArticles && hasInitialized;
  const showInitialState = !hasInitialized && !isIntersecting;

  return (
    <section id="publications" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>Publications</h2>
          <p className="section-subtitle">
            My own blog posts and open source projects
          </p>
        </div>
        <div className="space-y-6">
          {/* İlk durrum - Section henüz görünmedi */}
          {showInitialState && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                <FiBookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Scroll down to load articles
              </p>
            </div>
          )}

          {/* Yükleme durumu */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse space-y-4 w-full max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="card">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hata durumu */}
          {showError && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <FiBookOpen className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Please check back later</p>
              <button
                onClick={fetchArticles}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Boş durum */}
          {showEmptyState && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <FiBookOpen className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">No articles found at this time</p>
            </div>
          )}

          {/* Makaleler */}
          {hasArticles && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medium Blog Posts */}
              {articles.map((article, index) => (
                <motion.a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card group hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        <FiBookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {article.title}
                        </h3>
                        <p className="text-sm text-blue-800 dark:text-blue-400">
                          <span className="mr-2">{article.emoji}</span>
                          ✍️ Blog
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-sm text-blue-800 dark:text-blue-400">
                        <FiCalendar className="w-4 h-4" />
                        {article.pubDate}
                      </span>
                      <FiExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Publications;