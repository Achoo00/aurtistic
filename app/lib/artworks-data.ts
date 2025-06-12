// app/lib/artworks-data.ts

function getBaseUrl() {
  // If in the browser, use the current origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // If during a Vercel build or runtime, Vercel provides specific environment variables
  // VERCEL_URL gives you the deployment URL (e.g., your-project.vercel.app)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback for local development if NEXT_PUBLIC_BASE_URL isn't set,
  // or for general Node.js environments
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}


export async function fetchArtworks() {
  // Use getBaseUrl() to form a complete URL for the static JSON file
  // This ensures it's always a valid HTTP/HTTPS URL
  const url = `${getBaseUrl()}/mock_images/artworks/mock_artworks.json`; // <--- Use getBaseUrl() here

  console.log("Fetching artworks from:", url); // This will now show the full URL

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch artworks: ${response.statusText} from ${url}`);
  }
  const artworks = await response.json();
  return artworks;
}