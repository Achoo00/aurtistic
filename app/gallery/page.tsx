// app/gallery/page.tsx
import { Suspense } from 'react'; // Import Suspense from React
import { fetchArtworks } from '@/app/lib/artworks-data'; // Your data fetching is now fixed!
import ArtworkGrid from '@/app/ui/gallery/grid'; // Import your client component

// This component is a Server Component by default
export default async function GalleryPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Your fetchArtworks is now correctly reading from the filesystem during prerendering
  const artworks = await fetchArtworks();

  return (
    <main>
      <h1>Our Art Gallery</h1>
      {/*
        You can pass searchParams directly from the Server Component to
        the Client Component if the Client Component needs them without
        using useSearchParams internally. Or, as in your current grid.tsx,
        the Client Component can use useSearchParams itself.
        The key is the <Suspense> boundary.
      */}

      {/* Wrap the ArtworkGrid Client Component with Suspense */}
      <Suspense fallback={<div>Loading gallery content...</div>}>
        {/*
          Pass the artworks prop to your ArtworkGrid.
          The searchParams are handled by useSearchParams *inside* ArtworkGrid.
        */}
        <ArtworkGrid artworks={artworks} />
      </Suspense>
    </main>
  );
}