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
    console.log(`[GitHub API] Fetching repositories for @${GITHUB_USERNAME}`);
    
    // API çağrısı
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    // Eğer token varsa ekle
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
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

    // Fork'lanmamış repoları filtrele
    const filteredRepos = data.filter((repo: GitHubRepo) => !repo.fork);
    
    console.log(`[GitHub API] Found ${data.length} repositories, ${filteredRepos.length} non-forked`);

    return res.status(200).json({ repositories: filteredRepos });
  } catch (error) {
    console.error('[GitHub API] Error:', error);
    return res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
  }
}

export default withMiddleware(handler, [cors, errorHandler]); 