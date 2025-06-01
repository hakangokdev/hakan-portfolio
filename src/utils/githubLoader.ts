export interface GitHubRepo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  createdAt: string;
  topics: string[];
  _sortableDate: Date;
  emoji: string;
}

// Pagination response interface
export interface GitHubReposResponse {
  repos: GitHubRepo[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// GitHub reposunu kategorilerine göre emoji atar
const getRepoEmoji = (name: string, description: string, language: string | null, topics: string[]): string => {
  const nameLower = (name || "").toLowerCase();
  const descLower = (description || "").toLowerCase();
  const allTopics = topics.map(t => t.toLowerCase()).join(' ');
  
  // İsim, açıklama veya konulara göre emoji seç
  // Web/Frontend projeler
  if (containsAny(nameLower, descLower, allTopics, ['react', 'frontend', 'nextjs', 'vue', 'angular'])) return '⚛️';
  if (containsAny(nameLower, descLower, allTopics, ['web', 'website', 'portfolio', 'html', 'css'])) return '🌐';
  
  // Backend projeler
  if (containsAny(nameLower, descLower, allTopics, ['api', 'server', 'backend', 'express'])) return '🔌';
  if (containsAny(nameLower, descLower, allTopics, ['database', 'sql', 'nosql', 'mongodb'])) return '🗄️';
  
  // AI ve ML projeler
  if (containsAny(nameLower, descLower, allTopics, ['ai', 'artificial-intelligence', 'machine-learning', 'ml'])) return '🧠';
  if (containsAny(nameLower, descLower, allTopics, ['detection', 'computer-vision', 'vision', 'image'])) return '👁️';
  if (containsAny(nameLower, descLower, allTopics, ['pedestrian', 'traffic', 'vehicle'])) return '🚶';
  
  // Yazılım geliştirme araçları
  if (containsAny(nameLower, descLower, allTopics, ['tool', 'utility', 'cli', 'command-line'])) return '🛠️';
  if (containsAny(nameLower, descLower, allTopics, ['automation', 'script', 'bot'])) return '🤖';
  
  // Sistemler ve uygulamalar
  if (containsAny(nameLower, descLower, allTopics, ['library', 'management'])) return '📚';
  if (containsAny(nameLower, descLower, allTopics, ['app', 'application', 'mobile'])) return '📱';
  
  // Programlama diline göre emoji seç
  if (language) {
    switch (language.toLowerCase()) {
      case 'javascript': return '🟨';
      case 'typescript': return '🔷';
      case 'python': return '🐍';
      case 'java': return '☕';
      case 'c#': return '🟢';
      case 'php': return '🐘';
      case 'html': return '🌐';
      case 'css': return '🎨';
      case 'ruby': return '💎';
      case 'go': return '🧊';
      case 'rust': return '🦀';
      case 'swift': return '🕊️';
      case 'kotlin': return '📱';
      case 'c++': return '⚙️';
      case 'c': return '🔍';
      case 'shell': return '🐚';
      case 'jupyter notebook': return '📓';
    }
  }
  
  // Varsayılan emoji
  return '📦';
};

// Yardımcı fonksiyon - stringlerde herhangi bir anahtar kelime var mı diye kontrol eder
const containsAny = (name: string, desc: string, topics: string, keywords: string[]): boolean => {
  return keywords.some(keyword => 
    name.includes(keyword) || 
    desc.includes(keyword) || 
    topics.includes(keyword)
  );
};

// GitHub'dan Link header'ını parse ederek pagination bilgisi çıkarır
const parseLinkHeader = (linkHeader: string): { hasNext: boolean, hasPrev: boolean, lastPage?: number } => {
  const links = linkHeader.split(',');
  let hasNext = false;
  let hasPrev = false;
  let lastPage: number | undefined;

  links.forEach(link => {
    const [url, rel] = link.split(';');
    if (rel && rel.includes('rel="next"')) {
      hasNext = true;
    }
    if (rel && rel.includes('rel="prev"')) {
      hasPrev = true;
    }
    if (rel && rel.includes('rel="last"')) {
      const pageMatch = url.match(/page=(\d+)/);
      if (pageMatch) {
        lastPage = parseInt(pageMatch[1]);
      }
    }
  });

  return { hasNext, hasPrev, lastPage };
};

// GitHub repolarını gerçek pagination ile çekip formatlar
export const loadGitHubRepos = async (page: number = 1): Promise<GitHubReposResponse> => {
  try {
    const GITHUB_USERNAME = 'hakangokdev';
    
    // GitHub API'ye page ve per_page=6 parametresi ile istek at
    const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&page=${page}&per_page=6`;
    
    console.log(`[GitHub] Fetching page ${page} with 6 repos per page`);
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid GitHub API response');
    }
    
    // Link header'ından pagination bilgisini çıkar
    const linkHeader = response.headers.get('Link');
    let hasNextPage = false;
    let hasPrevPage = false;
    let totalPages = page; // En az current page kadar var
    
    if (linkHeader) {
      const { hasNext, hasPrev, lastPage } = parseLinkHeader(linkHeader);
      hasNextPage = hasNext;
      hasPrevPage = hasPrev;
      if (lastPage) {
        totalPages = lastPage;
      }
    }
    
    // Eğer current page'de repo yoksa ve page 1'den büyükse, hasNext false olmalı
    if (data.length === 0 && page > 1) {
      hasNextPage = false;
    }
    
    // Fork'lanmamış repoları filtrele
    const nonForkRepos = data.filter((repo: any) => !repo.fork);
    
    console.log(`[GitHub] Found ${data.length} repositories, ${nonForkRepos.length} non-forked on page ${page}`);
    
    // Repoları formatla
    const repos: GitHubRepo[] = nonForkRepos.map((repo: any) => {
      const updatedDate = new Date(repo.updated_at);
      const emoji = getRepoEmoji(
        repo.name, 
        repo.description || '', 
        repo.language,
        repo.topics || []
      );
      
      return {
        id: repo.id.toString(),
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'No description provided',
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updatedAt: updatedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        createdAt: new Date(repo.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        topics: repo.topics || [],
        _sortableDate: updatedDate,
        emoji
      };
    });
      
    return {
      repos,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPrevPage
    };
  } catch (error) {
    console.error('[GitHub] Error fetching repositories:', error);
    return {
      repos: [],
      currentPage: page,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false
    };
  }
}; 