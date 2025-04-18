export interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  link?: string;
  order: number;
}

interface Manifest {
  events: string[];
  order: Record<string, number>;
  dates: Record<string, string>;
  locations: Record<string, string>;
  images: Record<string, string>;
}

const formatTitle = (filename: string): string => {
  return filename
    .split('-')
    .map((word: string) => {
      // Handle special cases like "GDG", "YTÜ", "IÜ", "KOÜ", etc.
      if (/^[A-Z0-9Ü]+$/i.test(word)) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export const loadEvents = async (): Promise<EventData[]> => {
  try {
    const events: EventData[] = [];
    const response = await fetch('/events-photos/manifest.json');
    const manifest: Manifest = await response.json();

    for (const eventFile of manifest.events) {
      try {
        // Get the image path from manifest
        const imagePath = `/events-photos/${manifest.images[eventFile]}`;
        
        // Fetch and parse the description file
        const txtResponse = await fetch(`/events-photos/${eventFile}.txt`);
        const content = await txtResponse.text();
        
        // Parse the content
        const lines = content.split('\n').filter(line => line.trim());
        const link = lines[lines.length - 1].trim();
        const description = lines.slice(0, -1).join('\n').trim();
        
        // Generate title and get metadata from manifest
        const title = formatTitle(eventFile);
        const date = manifest.dates[eventFile] || 'TBD';
        const location = manifest.locations[eventFile] || 'TBD';
        const order = manifest.order[eventFile] || 999; // Default to end if no order specified

        events.push({
          id: events.length + 1,
          title,
          date,
          location,
          description,
          image: imagePath,
          link: link.startsWith('http') ? link : undefined,
          order
        });
      } catch (error) {
        console.error(`Error loading event ${eventFile}:`, error);
      }
    }

    // Sort events by custom order
    return events.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
}; 