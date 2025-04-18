export interface MediumArticle {
  id: string;
  title: string;
  emoji: string;
  subtitle?: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  readingTime?: string;
}

const extractThumbnail = (content: string): string | undefined => {
  const figureMatch = content.match(/<figure[^>]*>.*?<img[^>]+src="([^">]+)".*?<\/figure>/);
  if (figureMatch) {
    return figureMatch[1].replace(/\?.*$/, '');
  }
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1].replace(/\?.*$/, '') : undefined;
};

const extractReadingTime = (content: string): string | undefined => {
  const timeMatch = content.match(/(\d+)\s+min read/);
  return timeMatch ? `${timeMatch[1]} min ⏱️` : undefined;
};

const extractSubtitle = (content: string): string | undefined => {
  // Try to get the first paragraph after removing any HTML tags
  const cleanContent = content.replace(/<[^>]+>/g, '');
  const firstParagraph = cleanContent.split('\n').find(p => p.trim().length > 0);
  return firstParagraph?.trim();
};

const getArticleEmoji = (title: string, content: string): string => {
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

export const loadMediumArticles = async (): Promise<MediumArticle[]> => {
  try {
    console.log('Fetching Medium articles...');
    const response = await fetch('/api/medium-feed', {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      credentials: 'same-origin'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch Medium feed:', response.status, errorText);
      throw new Error(`Failed to fetch Medium feed: ${response.status}`);
    }

    const { feed } = await response.json();
    if (!feed?.rss?.channel?.[0]?.item) {
      console.error('Invalid feed structure:', feed);
      throw new Error('Invalid feed structure received');
    }

    const articles: MediumArticle[] = [];
    const processedLinks = new Set<string>();

    // Process the parsed XML data
    const items = feed.rss.channel[0].item;
    console.log(`Found ${items.length} items in feed`);
    
    items.forEach((item: any) => {
      try {
        // Extract and validate required fields
        const title = item.title?.[0];
        const link = item.link?.[0];
        const pubDate = item.pubdate?.[0] || item.pubDate?.[0];
        const content = item['content:encoded']?.[0] || item.description?.[0] || '';

        if (!title || !link || !pubDate) {
          console.warn('Skipping item due to missing required fields:', { title, link, pubDate });
          return;
        }

        // Only add if we haven't processed this article yet
        if (!processedLinks.has(link)) {
          processedLinks.add(link);
          const emoji = getArticleEmoji(title, content);
          console.log(`Processing article: "${title}" -> Emoji: ${emoji}`);
          
          articles.push({
            id: link,
            title,
            emoji,
            subtitle: extractSubtitle(content),
            link,
            pubDate: new Date(pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            thumbnail: extractThumbnail(content),
            readingTime: extractReadingTime(content)
          });
        }
      } catch (itemError) {
        console.error('Error processing feed item:', itemError);
      }
    });

    if (articles.length === 0) {
      console.warn('No articles were successfully processed');
    }

    // Sort articles by date (newest first)
    return articles.sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
  } catch (error) {
    console.error('Error loading Medium articles:', error);
    throw error;
  }
}; 