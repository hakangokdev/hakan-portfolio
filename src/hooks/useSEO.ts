import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
}

const seoData: { [key: string]: SEOData } = {
  '/': {
    title: 'Hakan Gök | Full-Stack Software Engineer - React.js & JavaScript Uzmanı',
    description: 'Hakan Gök - Full-Stack Software Engineer. React.js, JavaScript, TypeScript, MongoDB, MySQL. Konya merkezli yazılım geliştirici ve mobil uygulama uzmanı.',
    keywords: 'Hakan Gök, yazılım mühendisi, software engineer, React developer, full-stack developer, JavaScript, TypeScript, MongoDB, MySQL, Android developer, Konya yazılım geliştiricisi',
    canonical: 'https://www.hakangok.tech/'
  }
};

export const useSEO = () => {
  const location = useLocation();
  
  useEffect(() => {
    // For SPA, always use the main page SEO data
    const currentSEO = seoData['/'];
    
    // Update title
    document.title = currentSEO.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', currentSEO.keywords);
    }
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentSEO.canonical);
    }
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentSEO.title);
    }
    
    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', currentSEO.description);
    }
    
    // Update Open Graph URL
    const ogURL = document.querySelector('meta[property="og:url"]');
    if (ogURL) {
      ogURL.setAttribute('content', currentSEO.canonical);
    }
    
  }, [location]);
  
  return {
    currentSEO: seoData['/']
  };
}; 