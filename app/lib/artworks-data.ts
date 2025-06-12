// app/lib/fetchArtworks.ts

// Helper function to get the base URL dynamically
function getBaseUrl() {
    // Check if window (browser environment) is defined
    if (typeof window !== 'undefined') {
        return window.location.origin; // e.g., "http://localhost:3000" or "https://your-domain.com"
    }
    // If not in the browser, use the server-side environment variable
    // NEXT_PUBLIC_BASE_URL is accessible on both client and server
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Fallback for safety
}

// This will be replaced with actual Supabase queries later
export async function fetchArtworks() {
    // Construct the full URL for the static JSON file
    const url = `${getBaseUrl()}/mock_images/artworks/mock_artworks.json`;

    console.log("Fetching artworks from:", url); // Add a log to confirm the URL

    const response = await fetch(url);

    if (!response.ok) {
        // It's good practice to throw an error if the fetch fails
        throw new Error(`Failed to fetch artworks: ${response.statusText}`);
    }
    const artworks = await response.json();
    return artworks;
}