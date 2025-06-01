import React from 'react';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false
}) => {
  const getVisiblePages = (): number[] => {
    const visibleCount = 6; 
    const pages: number[] = [];
    
    let startPage = Math.max(1, currentPage - Math.floor(visibleCount / 2));
    let endPage = Math.min(totalPages, startPage + visibleCount - 1);
    
    if (endPage - startPage + 1 < visibleCount) {
      startPage = Math.max(1, endPage - visibleCount + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null; 
  }

  return (
    <div className="flex justify-center items-center mt-8">
      {/* Sadece sayfa numaraları */}
      <div className="flex space-x-1">
        {visiblePages.map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            className={`
              px-3 py-2 rounded-lg border transition-all duration-200 min-w-[40px] font-medium
              ${page === currentPage
                ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md'
                : isLoading
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                : 'bg-white dark:bg-dark-200 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-md'
              }
            `}
            aria-label={`Sayfa ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Pagination; 