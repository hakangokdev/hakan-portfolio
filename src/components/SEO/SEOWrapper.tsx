import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOWrapper: React.FC<SEOProps> = ({
  title = "Hakan Gök | Full-Stack Software Engineer - React.js & JavaScript Uzmanı",
  description = "Hakan Gök - Full-Stack Software Engineer. React.js, JavaScript, TypeScript, MongoDB, MySQL. Ankara merkezli yazılım geliştirici ve mobil uygulama uzmanı.",
  keywords = "Hakan Gök, yazılım mühendisi, software engineer, React developer, full-stack developer, JavaScript, TypeScript, MongoDB, MySQL, Android developer, Ankara yazılım geliştiricisi, web developer",
  image = "https://hakangok.dev/events-photos/profile-photo.jpeg",
  url = "https://hakangok.dev",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEOWrapper; 