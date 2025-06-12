// app/lib/artworks-data.ts

import fs from 'fs/promises'; // Import Node.js filesystem promises API
import path from 'path';     // Import Node.js path module

// You can keep getBaseUrl() if you use it for other *external* API calls in other parts of your app.
// However, for this static JSON file, we will no longer use it or the fetch API.
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
}

export async function fetchArtworks() {
    console.log("DEBUG: ***EXECUTING NEW FETCHARTWORKS LOGIC***");
    let jsonData;

  try {
    const filePath = path.join(process.cwd(), 'public', 'mock_images', 'artworks', 'mock_artworks.json');
    console.log("Reading artworks from filesystem:", filePath);

    const fileContent = await fs.readFile(filePath, 'utf-8');
    jsonData = JSON.parse(fileContent);

  } catch (error: unknown) { // Explicitly typing 'error' as unknown can be helpful for clarity
    console.error("Error reading mock_artworks.json from filesystem:", error);
    
    // --- FIX IS HERE ---
    // Safely check if 'error' is an instance of Error before accessing .message
    if (error instanceof Error) {
      throw new Error(`Failed to read artworks from filesystem: ${error.message}`);
    } else {
      // If it's not an Error object, convert it to a string or provide a generic message
      throw new Error(`Failed to read artworks from filesystem: An unknown error occurred.`);
    }
  }

  return jsonData;
}