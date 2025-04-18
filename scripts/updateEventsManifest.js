import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EVENTS_DIR = path.join(__dirname, '../public/events-photos');
const MANIFEST_PATH = path.join(EVENTS_DIR, 'manifest.json');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg'];

// Helper function to extract date from text content
const extractDate = (content) => {
  const datePatterns = [
    /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}/i,
    /\d{4}[-/]\d{1,2}[-/]\d{1,2}/,
    /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?,\s+\d{4}/i
  ];

  for (const pattern of datePatterns) {
    const match = content.match(pattern);
    if (match) return match[0];
  }
  return null;
};

// Helper function to extract location from text content
const extractLocation = (content) => {
  const locationPatterns = [
    /(?:at|in)\s+([^,.]+(?:University|College|School|Institute|Center|Centre|Conference|Summit|Meetup|Online))/i,
    /(?:at|in)\s+([^,.]+,\s*[^,.]+)/,
    /(?:at|in)\s+([^.]+)/i // More general pattern for other locations
  ];

  for (const pattern of locationPatterns) {
    const match = content.match(pattern);
    if (match) return match[1].trim();
  }
  return null;
};

// Helper function to find image files
const findImageFiles = (directory) => {
  const files = fs.readdirSync(directory);
  const imageFiles = new Set();
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (IMAGE_EXTENSIONS.includes(ext)) {
      const baseName = path.basename(file, ext);
      imageFiles.add(baseName);
    }
  }
  
  return Array.from(imageFiles);
};

// Main function to update the manifest
const updateManifest = async () => {
  try {
    // Get all event base names from image files
    const events = findImageFiles(EVENTS_DIR);
    console.log(`Found ${events.length} events with images`);

    // Initialize manifest data
    const manifestData = {
      events: [],
      dates: {},
      locations: {}
    };

    // Process each event
    for (const event of events) {
      const txtPath = path.join(EVENTS_DIR, `${event}.txt`);
      
      // Check if the text file exists
      if (fs.existsSync(txtPath)) {
        try {
          // Read and process the text file
          const content = await fs.promises.readFile(txtPath, 'utf-8');
          const date = extractDate(content);
          const location = extractLocation(content);

          // Add to manifest
          manifestData.events.push(event);
          if (date) manifestData.dates[event] = date;
          if (location) manifestData.locations[event] = location;
          
          console.log(`✓ Processed event: ${event}`);
          if (date) console.log(`  Date: ${date}`);
          if (location) console.log(`  Location: ${location}`);
        } catch (error) {
          console.error(`Error processing ${event}:`, error);
        }
      } else {
        console.warn(`⚠️ No text file found for event: ${event}`);
      }
    }

    // Sort events by date (newest first)
    manifestData.events.sort((a, b) => {
      const dateA = new Date(manifestData.dates[a] || '1900');
      const dateB = new Date(manifestData.dates[b] || '1900');
      return dateB - dateA;
    });

    // Write the manifest file
    await fs.promises.writeFile(
      MANIFEST_PATH,
      JSON.stringify(manifestData, null, 2),
      'utf-8'
    );

    console.log('\n✅ Events manifest updated successfully!');
    console.log(`📝 Total events: ${manifestData.events.length}`);
    
    // Print manifest summary
    console.log('\nManifest Summary:');
    console.log('----------------');
    for (const event of manifestData.events) {
      console.log(`\n${event}:`);
      console.log(`  Date: ${manifestData.dates[event] || 'Not found'}`);
      console.log(`  Location: ${manifestData.locations[event] || 'Not found'}`);
    }
  } catch (error) {
    console.error('❌ Error updating events manifest:', error);
    process.exit(1);
  }
};

// Run the update
updateManifest(); 