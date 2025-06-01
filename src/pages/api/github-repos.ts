import type { NextApiRequest, NextApiResponse } from 'next';
import { withMiddleware, cors, errorHandler } from './middleware';

// GitHub API yanıt tipi
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  homepage: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
}

// Response tipi
interface PaginatedResponse {
  repositories: GitHubRepo[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

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

const GITHUB_USERNAME = 'hakangokdev'; 
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''; // Eğer varsa token kullan

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=3600'); // 1 saat cache

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Query parametrelerini al
    const page = parseInt(req.query.page as string) || 1;
    
    console.log(`[GitHub API] Fetching repositories for @${GITHUB_USERNAME}, page ${page} with 6 repos per page`);
    
    // API çağrısı - page ve per_page=6 ile
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    // Eğer token varsa ekle
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&page=${page}&per_page=6`,
      { headers }
    );

    if (!response.ok) {
      console.error(`[GitHub API] Error: ${response.status} - ${response.statusText}`);
      throw new Error(`Failed to fetch repositories: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('[GitHub API] Invalid response structure');
      throw new Error('Invalid API response structure');
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

    // Fork'lanmamış repoları filtrele
    const filteredRepos = data.filter((repo: GitHubRepo) => !repo.fork);
    
    console.log(`[GitHub API] Found ${data.length} repositories, ${filteredRepos.length} non-forked on page ${page}`);

    const paginatedResponse: PaginatedResponse = {
      repositories: filteredRepos,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    };

    return res.status(200).json(paginatedResponse);
  } catch (error) {
    console.error('[GitHub API] Error:', error);
    return res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
  }
}

export default withMiddleware(handler, [cors, errorHandler]); 