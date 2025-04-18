import type { NextApiRequest, NextApiResponse } from 'next';
import { withMiddleware, cors, errorHandler } from './middleware';
import { XMLParser } from 'fast-xml-parser';

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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
          item: feed.rss.channel.item.map(article => ({
            title: [article.title],
            link: [article.link],
            pubDate: [article.pubDate],
            'content:encoded': [article['content:encoded'] || article.description || ''],
            description: [article.description || ''],
            publication: ['Personal Blog']
          }))
        }]
      }
    };

    return res.status(200).json({ feed: formattedFeed });
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return res.status(500).json({ error: 'Failed to fetch Medium articles' });
  }
}

export default withMiddleware(handler, [cors, errorHandler]); 