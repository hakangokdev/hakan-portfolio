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

// GitHub repolarını çekip formatlar
export const loadGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const GITHUB_USERNAME = 'hakangokdev';
    const directApiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`;
    
    console.log('[GitHub] Fetching repositories directly from GitHub API');
    const response = await fetch(directApiUrl, {
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
    
    console.log(`[GitHub] Found ${data.length} repositories from GitHub API`);
    
    // Fork'lanmamış repoları filtrele
    const repos: GitHubRepo[] = data
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => {
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
      })
      .sort((a: GitHubRepo, b: GitHubRepo) => b._sortableDate.getTime() - a._sortableDate.getTime());
      
    return repos;
  } catch (error) {
    console.error('[GitHub] Error fetching repositories:', error);
    return [];
  }
}; 