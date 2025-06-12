// app/lib/artworks-data.ts

import fs from 'fs/promises'; // Import Node.js filesystem promises API
import path from 'path';     // Import Node.js path module

// You can remove or keep getBaseUrl() if you use it for other *external* API calls.
// For this static JSON file, we will no longer use it.
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
}


export async function fetchArtworks() {
  let jsonData;

  // Check if we are in a browser environment (client-side render or local dev client-side)
  if (typeof window !== 'undefined') {
    // In the browser, fetch normally from the public URL
    const url = `/mock_images/artworks/mock_artworks.json`; // Use absolute path relative to domain
    console.log("Fetching artworks from browser:", url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch artworks: ${response.statusText} from ${url}`);
    }
    jsonData = await response.json();
  } else {
    // In a Node.js environment (server-side, Vercel build/prerendering)
    try {
      // Construct the absolute path to the JSON file using Node.js path module
      // process.cwd() gives the current working directory (project root)
      const filePath = path.join(process.cwd(), 'public', 'mock_images', 'artworks', 'mock_artworks.json');
      console.log("Reading artworks from filesystem:", filePath);

      const fileContent = await fs.readFile(filePath, 'utf-8');
      jsonData = JSON.parse(fileContent);

    } catch (error) {
      console.error("Error reading mock_artworks.json from filesystem:", error);
      throw new Error(`Failed to read artworks from filesystem: ${error.message}`);
    }
  }

  return jsonData;
}