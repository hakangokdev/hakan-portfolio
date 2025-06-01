import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiCalendar, FiStar, FiCode } from "react-icons/fi";
import { GitHubReposResponse, loadGitHubRepos } from "../../utils/githubLoader";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import Pagination from "../ui/Pagination";

const Projects = () => {
  const [repoData, setRepoData] = useState<GitHubReposResponse>({
    repos: [],
    currentPage: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Intersection Observer for lazy loading
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  const fetchRepos = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const githubRepos = await loadGitHubRepos(page); // Sadece page parametresi
      
      if (githubRepos.repos.length === 0 && page === 1) {
        console.warn("No GitHub repositories found - check the API response");
        setError("Couldn't load GitHub repositories at this time");
      } else {
        setRepoData(githubRepos);
        setError(null);
      }
    } catch (err) {
      console.error("Error loading GitHub repositories:", err);
      setError("Failed to load GitHub repositories");
    } finally {
      setIsLoading(false);
    }
  };

  // Lazy loading effect - sadece section görünür olduğunda çalış
  useEffect(() => {
    if (isIntersecting && !hasInitialized) {
      console.log("[Projects] Section is visible, loading first page");
      setHasInitialized(true);
      fetchRepos(1);
    }
  }, [isIntersecting, hasInitialized]);

  // Sayfa değiştirme handler
  const handlePageChange = (page: number) => {
    console.log(`[Projects] Loading page ${page}`);
    fetchRepos(page);
    
    // Sayfayı değiştirdiğinde yukarı scroll yap
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Yükleme durumlarını yönetmek için
  const hasRepos = repoData.repos.length > 0;
  const showError = error && !hasRepos;
  const showEmptyState = !isLoading && !error && !hasRepos && hasInitialized;
  const showInitialState = !hasInitialized && !isIntersecting;

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>Projects</h2>
          <p className="section-subtitle">
            My personal and open source projects on GitHub
          </p>
        </div>
        
        <div className="space-y-6">
          {/* İlk durrum - Section henüz görünmedi */}
          {showInitialState && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                <FiGithub className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Scroll down to load GitHub projects
              </p>
            </div>
          )}

          {/* Yükleme durumu */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse space-y-4 w-full max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="card">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="flex justify-between items-center">
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
                <FiGithub className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Please check back later</p>
              <button
                onClick={() => fetchRepos(1)}
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
                <FiGithub className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">No projects found at this time</p>
            </div>
          )}

          {/* Projeler */}
          {hasRepos && !isLoading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repoData.repos.map((repo, index) => (
                  <motion.a
                    key={repo.id}
                    href={repo.url}
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
                          <FiGithub className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {repo.name}
                          </h3>
                          <p className="text-sm text-blue-800 dark:text-blue-400 mt-1 line-clamp-2">
                            {repo.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {repo.language && (
                              <span className="inline-flex items-center text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                                <FiCode className="mr-1 w-3 h-3" />
                                {repo.language}
                              </span>
                            )}
                            {repo.stars > 0 && (
                              <span className="inline-flex items-center text-xs px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">
                                <FiStar className="mr-1 w-3 h-3" />
                                {repo.stars}
                              </span>
                            )}
                            <span className="text-sm">
                              <span className="mr-1">{repo.emoji}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="flex items-center gap-1 text-sm text-blue-800 dark:text-blue-400">
                          <FiCalendar className="w-4 h-4" />
                          {repo.updatedAt}
                        </span>
                        <FiExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={repoData.currentPage}
                totalPages={repoData.totalPages}
                onPageChange={handlePageChange}
                hasNextPage={repoData.hasNextPage}
                hasPrevPage={repoData.hasPrevPage}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects; 