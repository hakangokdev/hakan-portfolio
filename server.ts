import express, { Request, Response } from 'express';
import cors from 'cors';
import { XMLParser } from 'fast-xml-parser';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

interface MediumFeed {
  rss: {
    channel: {
      item: Array<{
        title: string;
        link: string;
        pubDate: string;
        'content:encoded'?: string;
        description?: string;
        'dc:creator'?: string;
      }>;
    };
  };
}

const MEDIUM_USERNAME = 'merttpolat';
const RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

const getArticleEmoji = (title: string, content: string): string => {
  // Specific article matches
  if (title.includes('Creating a Private GKE Cluster and Bastion VM with Terraform')) {
    return '🏰';  // Castle for private cluster
  }
  if (title.includes('Pushing Docker Images to GitHub Registry')) {
    return '📦';  // Package for container registry
  }
  if (title.includes('How to Resolve GCP Public Key SSH Error')) {
    return '🔑';  // Key for SSH
  }
  if (title.includes('Gitlab Version Upgrade')) {
    return '⬆️';  // Up arrow for upgrade
  }

  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();

  // DevOps related
  if (titleLower.includes('devops') || contentLower.includes('devops')) return '🔄';
  if (titleLower.includes('pipeline') || contentLower.includes('pipeline')) return '⚡';
  if (titleLower.includes('ci/cd') || contentLower.includes('ci/cd')) return '🔁';
  
  // Cloud related
  if (titleLower.includes('cloud') || contentLower.includes('cloud')) return '☁️';
  if (titleLower.includes('google cloud') || contentLower.includes('gcp')) return '🌩️';
  if (titleLower.includes('aws') || contentLower.includes('amazon')) return '📦';
  if (titleLower.includes('azure') || contentLower.includes('microsoft')) return '💠';
  
  // Infrastructure & Tools
  if (titleLower.includes('kubernetes') || contentLower.includes('kubernetes')) return '🎡';
  if (titleLower.includes('docker') || contentLower.includes('container')) return '🐳';
  if (titleLower.includes('terraform') || contentLower.includes('infrastructure')) return '🏗️';
  if (titleLower.includes('ansible') || contentLower.includes('automation')) return '🤖';
  
  // Security
  if (titleLower.includes('security') || contentLower.includes('security')) return '🔒';
  if (titleLower.includes('devsecops') || contentLower.includes('devsecops')) return '🛡️';
  
  // Monitoring & Observability
  if (titleLower.includes('monitoring') || contentLower.includes('monitoring')) return '📊';
  if (titleLower.includes('logging') || contentLower.includes('logs')) return '📝';
  if (titleLower.includes('metrics') || contentLower.includes('metrics')) return '📈';
  
  // Development
  if (titleLower.includes('git') || contentLower.includes('version control')) return '🔀';
  if (titleLower.includes('api') || contentLower.includes('rest')) return '🔌';
  if (titleLower.includes('microservice') || contentLower.includes('microservice')) return '🔨';
  
  // AI & ML
  if (titleLower.includes('ai') || contentLower.includes('artificial intelligence')) return '🤖';
  if (titleLower.includes('ml') || contentLower.includes('machine learning')) return '🧠';

  // General tech
  if (titleLower.includes('guide') || contentLower.includes('how to')) return '📚';
  if (titleLower.includes('tips') || contentLower.includes('best practices')) return '💡';
  if (titleLower.includes('tutorial') || contentLower.includes('learn')) return '✏️';
  
  // Default emoji for other tech content
  return '💻';
};

app.get('/api/medium-feed', async (req: Request, res: Response) => {
  try {
    console.log('Fetching Medium feed from:', RSS_URL);
    const response = await fetch(RSS_URL);
    
    if (!response.ok) {
      console.error('Failed to fetch feed:', response.status, response.statusText);
      throw new Error(`Failed to fetch feed: ${response.status}`);
    }

    const text = await response.text();
    console.log('Received feed text length:', text.length);

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "text",
      ignoreDeclaration: true,
      parseAttributeValue: true,
      trimValues: true
    });

    const feed = parser.parse(text) as MediumFeed;

    if (!feed?.rss?.channel?.item) {
      console.error('Invalid feed structure:', feed);
      throw new Error('Invalid feed structure');
    }

    console.log(`Found ${feed.rss.channel.item.length} articles`);

    // Create the feed structure
    const formattedFeed = {
      rss: {
        channel: [{
          item: feed.rss.channel.item.map(article => {
            const emoji = getArticleEmoji(article.title, article['content:encoded']?.[0] || article.description || '');
            return {
              title: [article.title],
              emoji: emoji,
              link: [article.link],
              pubDate: [article.pubDate],
              'content:encoded': [article['content:encoded'] || article.description || ''],
              description: [article.description || '']
            };
          })
        }]
      }
    };

    return res.json({ feed: formattedFeed });
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return res.status(500).json({ error: 'Failed to fetch Medium articles' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 