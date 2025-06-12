// app/gallery/page.tsx

import { Suspense } from 'react';
import { fetchArtworks } from '@/app/lib/artworks-data';
import ArtworkGrid from '@/app/ui/gallery/grid';

export default async function GalleryPage({
  // Keep searchParams in props for type safety, but AVOID accessing its properties here.
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // --- REMOVE THESE LINES ---
  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;
  // const resolvedSearchParams = Object.assign({}, searchParams);
  // const { query, page } = resolvedSearchParams;
  // const currentQuery = query || '';
  // const currentPage = Number(page || '1');
  // --- END REMOVED LINES ---

  // Your fetchArtworks is now correctly reading from the filesystem during prerendering
  const artworks = await fetchArtworks();

  return (
    <main>
      <h1>Our Art Gallery</h1>
      <Suspense fallback={<div>Loading gallery content...</div>}>
        {/*
          Pass ONLY the `artworks` prop to ArtworkGrid.
          ArtworkGrid will use its own `useSearchParams()` to get query and page,
          which is already client-side safe within a Suspense boundary.
        */}
        <ArtworkGrid artworks={artworks} />
      </Suspense>
    </main>
  );
}