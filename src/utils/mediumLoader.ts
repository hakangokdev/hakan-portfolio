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

  // Portfolio & Web Development
  if (titleLower.includes('portfolio') || contentLower.includes('portfolio')) return '💼';
  if (titleLower.includes('react') || contentLower.includes('react')) return '⚛️';
  if (titleLower.includes('typescript') || contentLower.includes('typescript')) return '🔷';
  if (titleLower.includes('website') || contentLower.includes('website')) return '🌐';
  if (titleLower.includes('modern') || contentLower.includes('modern')) return '✨';
  if (titleLower.includes('building') || contentLower.includes('building')) return '🏗️';
  if (titleLower.includes('api') || contentLower.includes('api')) return '🔌';
  if (titleLower.includes('integration') || contentLower.includes('integration')) return '🔗';
  if (titleLower.includes('real-time') || contentLower.includes('real-time')) return '⚡';

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
  
  // Default emoji
  return '✍️'; // Daha genel bir blog yazısı emojisi
};

export const loadMediumArticles = async (): Promise<MediumArticle[]> => {
  const MEDIUM_USERNAME = 'gokhakan';
  
  // Cache busting için timestamp ekliyoruz
  const timestamp = new Date().getTime();
  const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}&_t=${timestamp}`;

  try {
    console.log('[Medium] Fetching articles with cache busting...');
    
    // Üçüncü parti RSS çevirici servis kullanarak CORS sorunlarını aşıyoruz
    const response = await fetch(RSS_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error(`[Medium] Fetch error: ${response.status}`);
      throw new Error(`Failed to fetch Medium feed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data?.items || !Array.isArray(data.items)) {
      console.error('[Medium] Invalid feed structure:', data);
      return [];
    }

    console.log(`[Medium] Found ${data.items.length} articles in RSS feed`);
    console.log('[Medium] Latest articles:', data.items.slice(0, 3).map((item: any) => ({
      title: item.title,
      pubDate: item.pubDate,
      link: item.link
    })));
    
    const articles: MediumArticle[] = [];
    const processedLinks = new Set<string>();
    
    // RSS2JSON formatındaki verileri işle
    data.items.forEach((item: any, index: number) => {
      try {
        const title = item.title;
        const link = item.link;
        const pubDate = item.pubDate;
        const content = item.content || item.description || '';
        
        console.log(`[Medium] Processing article ${index + 1}: "${title}"`);
        
        // Link gerekli, yoksa atla
        if (!link) {
          console.warn(`[Medium] Skipping article without link: "${title}"`);
          return;
        }

        // Her makaleyi bir kez ekle
        if (!processedLinks.has(link)) {
          processedLinks.add(link);
          
          const pubDateObj = new Date(pubDate);
          const displayPubDate = !isNaN(pubDateObj.getTime()) 
            ? pubDateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : "Tarih yok";
            
          const emoji = getArticleEmoji(title, content);
          
          articles.push({
            id: link,
            title,
            emoji,
            subtitle: extractSubtitle(content),
            link,
            pubDate: displayPubDate,
            _sortableDate: !isNaN(pubDateObj.getTime()) ? pubDateObj : new Date(0),
            thumbnail: extractThumbnail(content),
            readingTime: extractReadingTime(content)
          });
          
          console.log(`[Medium] Added article: "${title}" (${displayPubDate})`);
        } else {
          console.log(`[Medium] Duplicate link skipped: "${title}"`);
        }
      } catch (itemError) {
        console.error(`[Medium] Error processing article ${index + 1}:`, itemError);
      }
    });

    // Makaleleri tarihe göre sırala (yeniden eskiye)
    const sortedArticles = articles.sort((a, b) => 
      b._sortableDate.getTime() - a._sortableDate.getTime()
    );
    
    console.log(`[Medium] Successfully processed ${sortedArticles.length} articles`);
    console.log('[Medium] Final articles:', sortedArticles.map(article => ({
      title: article.title,
      pubDate: article.pubDate,
      emoji: article.emoji
    })));
    
    return sortedArticles;
  } catch (error) {
    console.error('[Medium] Error fetching articles:', error);
    // Hata durumunda boş dizi döndür, böylece uygulama çalışmaya devam edebilir
    return [];
  }
};