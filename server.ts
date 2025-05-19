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

const MEDIUM_USERNAME = 'gokhakan';
const RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

const getArticleEmoji = (title: string, content: string): string => {
  const titleLower = (title || "").toLowerCase();
  const contentLower = (content || "").toLowerCase();

  // AI & ML
  if (titleLower.includes('detection') || contentLower.includes('detection')) return '🚦';
  if (titleLower.includes('vehicle') || contentLower.includes('vehicle')) return '🚗';
  if (titleLower.includes('pedestrian') || contentLower.includes('pedestrian')) return '🚶';
  if (titleLower.includes('traffic') || contentLower.includes('traffic')) return '🚥';
  if (titleLower.includes('ai-powered') || contentLower.includes('ai-powered')) return '🤖';
  if (titleLower.includes('ai') || contentLower.includes('artificial intelligence')) return '🧠';
  if (titleLower.includes('ml') || contentLower.includes('machine learning')) return '🧮';
  
  // Library Management
  if (titleLower.includes('library') || contentLower.includes('library')) return '📚';
  if (titleLower.includes('management') || contentLower.includes('management')) return '🗃️';
  
  // Development
  if (titleLower.includes('system') || contentLower.includes('system')) return '⚙️';
  if (titleLower.includes('solution') || contentLower.includes('solution')) return '💡';
  if (titleLower.includes('digital') || contentLower.includes('digital')) return '💻';
  if (titleLower.includes('modern') || contentLower.includes('modern')) return '🔮';
  
  // Default emoji
  return '✍️';
};

app.get('/api/medium-feed', async (req: Request, res: Response) => {
  try {
    console.log(`[Medium API] Fetching feed for @${MEDIUM_USERNAME}...`);
    const response = await fetch(RSS_URL);
    
    if (!response.ok) {
      console.error(`[Medium API] Error: HTTP ${response.status} - ${response.statusText}`);
      throw new Error(`Failed to fetch feed: ${response.status}`);
    }

    const text = await response.text();
    
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
      console.error('[Medium API] Invalid feed structure received');
      throw new Error('Invalid feed structure');
    }


    // Create the feed structure without filtering by creator
    const formattedFeed = {
      rss: {
        channel: [{
          item: feed.rss.channel.item.map(article => {
            const emoji = getArticleEmoji(article.title, article['content:encoded'] || article.description || '');
            return {
              title: [article.title],
              emoji: [emoji],
              link: [article.link],
              pubDate: [article.pubDate],
              'content:encoded': [article['content:encoded'] || article.description || ''],
              description: [article.description || ''],
              'dc:creator': [article['dc:creator'] || MEDIUM_USERNAME]
            };
          })
        }]
      }
    };

    return res.json({ feed: formattedFeed });
  } catch (error) {
    console.error('[Medium API] Fatal error:', error);
    return res.status(500).json({ error: 'Failed to fetch Medium articles' });
  }
});

app.listen(port, () => {
  console.log(`[Server] Running at http://localhost:${port}`);
}); 