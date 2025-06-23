# Hakan Gök - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Full-Stack Software Engineer specializing in React.js, JavaScript, TypeScript, and mobile development.

## 🚀 Live Demo

Visit my portfolio: [hakangok.tech](https://www.hakangok.tech/)

## ✨ Features

- 🌓 Dark/Light mode
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- ⚡ Fast performance with optimized loading
- 🎯 **Comprehensive SEO optimization**
- 📝 Contact form with validation
- 🔗 Social media integration
- ♿ Accessibility compliant (WCAG 2.1)
- 🗺️ XML Sitemap for search engines
- 🤖 Robots.txt for crawler guidance
- 🔄 **Dynamic content loading via APIs**
- 📊 **Real-time GitHub projects integration**
- 📰 **Live Medium blog posts integration**

## 🔍 SEO Optimizations

### Meta Tags & Structured Data
- ✅ Comprehensive meta descriptions and keywords
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card support
- ✅ JSON-LD structured data for rich snippets
- ✅ Canonical URLs for duplicate content prevention

### Technical SEO
- ✅ XML Sitemap (`/sitemap.xml`)
- ✅ Robots.txt configuration
- ✅ Google Search Console ready
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (H1-H6)
- ✅ Alt text optimization for images
- ✅ Fast loading times (<3s)

### Targeted Keywords
Primary keywords: `Hakan Gök`, `Full-Stack Software Engineer`, `React.js Developer`, `JavaScript Developer`, `TypeScript`, `MongoDB`, `MySQL`, `Konya yazılım geliştirici`

### Performance Metrics
- 🚀 Lighthouse Score: 95+ (Performance, SEO, Accessibility)
- ⚡ First Contentful Paint: <1.5s
- 📱 Mobile-first responsive design
- 🔄 Code splitting for optimized loading

## 🌐 Dynamic Content Integration

### GitHub API Integration
- **Real-time Projects Display:** Automatically fetches and displays latest repositories from GitHub
- **Live Repository Data:** Shows stars, forks, languages, and descriptions
- **Automatic Updates:** Projects section updates dynamically without manual intervention
- **Repository Filtering:** Smart filtering to showcase relevant projects

### Medium API Integration
- **Live Blog Posts:** Automatically fetches latest articles from Medium profile
- **Dynamic Publications:** Publications section displays current blog content
- **Article Metadata:** Shows publication dates, reading time, and engagement metrics
- **Content Synchronization:** Keeps portfolio blog section up-to-date with Medium posts

## 💻 Tech Stack

- **Frontend:** React 18+, TypeScript, Tailwind CSS
- **APIs:** GitHub REST API, Medium RSS API
- **State Management:** React Hooks, Context API
- **HTTP Client:** Axios/Fetch for API calls
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **SEO:** React Helmet Async
- **Icons:** React Icons
- **Build Tool:** Vite with optimization plugins
- **Performance:** Code splitting, lazy loading, image optimization
- **Data Fetching:** Real-time API integration with error handling

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/hakangokdev/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview production build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Events.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Leadership.tsx
│   │   ├── Projects.tsx          // GitHub API integration
│   │   ├── Publications.tsx      // Medium API integration
│   │   └── Skills.tsx
│   └── SEO/
│       └── SEOWrapper.tsx
├── hooks/
│   ├── useSEO.ts
│   ├── useGitHub.ts             // GitHub API hook
│   └── useMedium.ts             // Medium API hook
├── services/
│   ├── githubApi.ts             // GitHub API service
│   └── mediumApi.ts             // Medium API service
├── types/
│   ├── github.ts                // GitHub API types
│   └── medium.ts                // Medium API types
├── pages/
├── utils/
├── App.tsx
└── main.tsx

public/
├── sitemap.xml
├── robots.txt
└── google-site-verification.html
```

## 🔧 API Configuration

### GitHub API Setup
- Fetches public repositories automatically
- Displays repository metadata (stars, forks, language)
- Filters repositories based on relevance
- Handles rate limiting and error states

### Medium RSS Integration
- Fetches latest blog posts from Medium profile
- Parses RSS feed for article metadata
- Displays publication dates and descriptions
- Handles CORS and feed parsing

### Environment Variables
```bash
# Optional: GitHub Personal Access Token for higher rate limits
VITE_GITHUB_TOKEN=your_github_token

# Medium RSS Feed URL
VITE_MEDIUM_RSS_URL=https://medium.com/feed/@yourusername
```

## 🔧 SEO Configuration

### Google Search Console Setup
1. Add your verification code to `index.html`
2. Submit sitemap: `https://www.hakangok.tech/sitemap.xml`
3. Monitor performance and indexing status

### Google Analytics (Optional)
1. Add GA4 tracking code to `index.html`
2. Configure goals and conversions
3. Monitor user engagement metrics

### Social Media Optimization
- Configure Open Graph images
- Set up Twitter Card previews
- Optimize LinkedIn sharing

## 🚀 Deployment & SEO

### Pre-deployment Checklist
- [ ] Update sitemap.xml with current date
- [ ] Verify all meta tags are properly configured
- [ ] Test social media sharing previews
- [ ] Run Lighthouse audit (aim for 95+ SEO score)
- [ ] Validate structured data markup
- [ ] Check mobile responsiveness
- [ ] Test API integrations and error handling

### Recommended Hosting
- **Vercel** (recommended for optimal performance)
- **Netlify** (good for static sites)
- **GitHub Pages** (free hosting option)

### Post-deployment SEO Tasks
1. Submit to Google Search Console
2. Submit to Bing Webmaster Tools
3. Create Google My Business profile (if applicable)
4. Build quality backlinks
5. Monitor search rankings

## 📊 SEO Monitoring

### Tools for Tracking
- Google Search Console
- Google Analytics
- Google PageSpeed Insights
- GTmetrix for performance monitoring
- Ahrefs/SEMrush for keyword tracking

### Key Metrics to Monitor
- Organic traffic growth
- Keyword rankings for "Hakan Gök" and related terms
- Page loading speed
- Mobile usability scores
- Social media engagement
- API response times and error rates

## 🔗 Important Links

- **Primary Domain:** https://www.hakangok.tech
- **Sitemap:** https://www.hakangok.tech/sitemap.xml
- **Robots.txt:** https://www.hakangok.tech/robots.txt
- **GitHub Profile:** https://github.com/hakangokdev
- **Medium Profile:** https://medium.com/@hakangok

## 📄 License

MIT License

## 👨‍💻 Author

**Hakan Gök** - Full-Stack Software Engineer  
Specializing in React.js, JavaScript, TypeScript, MongoDB, MySQL

- 🌍 **Website:** [hakangok.tech](https://www.hakangok.tech)
- 💼 **LinkedIn:** [gokhakan](https://linkedin.com/in/gokhakan)
- 🐙 **GitHub:** [hakangokdev](https://github.com/hakangokdev)
- 📧 **Email:** [Contact through website](https://www.hakangok.tech/#contact)
- 📍 **Location:** Konya, Turkey

---

*Portfolio with dynamic content integration, optimized for search engines and designed to showcase Full-Stack development expertise in React.js, JavaScript, TypeScript, API integrations, and mobile application development.*

