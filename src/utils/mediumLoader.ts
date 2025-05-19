export interface MediumArticle {
  id: string;
  title: string;
  emoji: string;
  subtitle?: string;
  link: string;
  pubDate: string; // Kullanıcıya gösterilecek formatlanmış tarih (örn: "October 26, 2023")
  thumbnail?: string;
  readingTime?: string;
  _sortableDate: Date; // Sıralama için kullanılacak gerçek Date nesnesi
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
  const cleanContent = content.replace(/<[^>]+>/g, '');
  const firstParagraph = cleanContent.split('\n').find(p => p.trim().length > 0);
  return firstParagraph?.trim();
};

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
  return '✍️'; // Daha genel bir blog yazısı emojisi
};

export const loadMediumArticles = async (): Promise<MediumArticle[]> => {
  const MEDIUM_USERNAME_FOR_FILTER = 'gokhakan';

  try {
    // API'den Medium makalelerini çek
    const response = await fetch('/api/medium-feed', {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      credentials: 'same-origin'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Medium Client] Fetch error: ${response.status}`);
      throw new Error(`Failed to fetch Medium feed: ${response.status}`);
    }

    const { feed } = await response.json();
    if (!feed?.rss?.channel?.[0]?.item) {
      console.error('[Medium Client] Invalid feed structure');
      throw new Error('Invalid feed structure received');
    }

    const articles: MediumArticle[] = [];
    const processedLinks = new Set<string>();

    const items = feed.rss.channel[0].item;
    
    // Makaleleri işle
    items.forEach((item: any) => {
      try {
        const rawTitle = item.title?.[0];
        const link = item.link?.[0];
        const rawPubDate = item.pubDate?.[0];
        const content = item['content:encoded']?.[0] || item.description?.[0] || '';
        const creator = item['dc:creator']?.[0] || item['dc:creator'] || MEDIUM_USERNAME_FOR_FILTER; 

        // Link gerekli, yoksa atla
        if (!link) {
          return;
        }

        const title = rawTitle || "Untitled";

        let displayPubDate: string;
        let sortableDate: Date;

        // Tarih bilgisini işle
        if (rawPubDate) {
          const dateObj = new Date(rawPubDate);
          if (!isNaN(dateObj.getTime())) {
            displayPubDate = dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            sortableDate = dateObj;
          } else {
            displayPubDate = "Tarih yok";
            sortableDate = new Date(0);
          }
        } else {
          displayPubDate = "Tarih yok";
          sortableDate = new Date(0);
        }
        
        // Her makaleyi bir kez ekle
        if (!processedLinks.has(link)) {
          processedLinks.add(link);
          const emoji = getArticleEmoji(title, content);
          
          articles.push({
            id: link,
            title,
            emoji,
            subtitle: extractSubtitle(content),
            link,
            pubDate: displayPubDate,
            _sortableDate: sortableDate,
            thumbnail: extractThumbnail(content),
            readingTime: extractReadingTime(content)
          });
        }
      } catch (itemError) {
        // Process silently, no need to log every error
      }
    });

    // Makaleleri tarihe göre sırala (yeniden eskiye)
    return articles.sort((a, b) => 
      b._sortableDate.getTime() - a._sortableDate.getTime()
    );
  } catch (error) {
    console.error('[Medium Client] Error:', error);
    throw error;
  }
};