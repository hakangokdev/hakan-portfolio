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
    description: 'Hakan Gök - Full-Stack Software Engineer. React.js, JavaScript, TypeScript, MongoDB, MySQL. Ankara merkezli yazılım geliştirici ve mobil uygulama uzmanı.',
    keywords: 'Hakan Gök, yazılım mühendisi, software engineer, React developer, full-stack developer, JavaScript, TypeScript, MongoDB, MySQL, Android developer, Ankara yazılım geliştiricisi',
    canonical: 'https://hakangok.dev/'
  },
  '/#about': {
    title: 'Hakkımda | Hakan Gök - Full-Stack Software Engineer',
    description: 'Hakan Gök hakkında bilgi. Full-Stack geliştirici olarak React.js, JavaScript, TypeScript, MongoDB ve MySQL teknolojilerinde uzmanım.',
    keywords: 'Hakan Gök hakkında, full-stack developer, React.js uzmanı, JavaScript developer, TypeScript, MongoDB, MySQL',
    canonical: 'https://hakangok.dev/#about'
  },
  '/#projects': {
    title: 'Projeler | Hakan Gök - Software Engineer Projeleri',
    description: 'Hakan Gök\'ün geliştirdiği yazılım projeleri. React.js, JavaScript, TypeScript, mobil uygulama geliştirme projeleri.',
    keywords: 'Hakan Gök projeleri, React projeleri, JavaScript projeleri, TypeScript projeleri, mobil uygulama projeleri',
    canonical: 'https://hakangok.dev/#projects'
  },
  '/#contact': {
    title: 'İletişim | Hakan Gök - Software Engineer',
    description: 'Hakan Gök ile iletişime geçin. Full-Stack geliştirici ve mobil uygulama uzmanı olarak projeleriniz için destek alın.',
    keywords: 'Hakan Gök iletişim, yazılım geliştirici iletişim, React developer hire, freelance developer',
    canonical: 'https://hakangok.dev/#contact'
  }
};

export const useSEO = () => {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname + location.hash;
    const currentSEO = seoData[currentPath] || seoData['/'];
    
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
    currentSEO: seoData[location.pathname + location.hash] || seoData['/']
  };
}; 