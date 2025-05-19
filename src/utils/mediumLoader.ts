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

// XML string'ini JS nesnesine dönüştüren yardımcı fonksiyon
const parseXML = (xmlString: string) => {
  // Basit bir XML parser fonksiyonu
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
  // RSS yapısını çıkartma
  const items = xmlDoc.querySelectorAll('item');
  const parsedItems = [];
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const title = item.querySelector('title')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const contentEncoded = item.querySelector('content\\:encoded')?.textContent || '';
    const creator = item.querySelector('dc\\:creator')?.textContent || '';
    
    parsedItems.push({
      title,
      link,
      pubDate,
      description,
      'content:encoded': contentEncoded,
      'dc:creator': creator
    });
  }
  
  return parsedItems;
};

export const loadMediumArticles = async (): Promise<MediumArticle[]> => {
  const MEDIUM_USERNAME = 'gokhakan';
  const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

  try {
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
      console.error('[Medium] Invalid feed structure');
      return [];
    }

    console.log(`[Medium] Found ${data.items.length} articles`);
    
    const articles: MediumArticle[] = [];
    const processedLinks = new Set<string>();
    
    // RSS2JSON formatındaki verileri işle
    data.items.forEach((item: any) => {
      try {
        const title = item.title;
        const link = item.link;
        const pubDate = item.pubDate;
        const content = item.content || item.description || '';
        
        // Link gerekli, yoksa atla
        if (!link) {
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
        }
      } catch (itemError) {
        // Process silently
      }
    });

    // Makaleleri tarihe göre sırala (yeniden eskiye)
    return articles.sort((a, b) => 
      b._sortableDate.getTime() - a._sortableDate.getTime()
    );
  } catch (error) {
    console.error('[Medium] Error:', error);
    // Hata durumunda boş dizi döndür, böylece uygulama çalışmaya devam edebilir
    return [];
  }
};