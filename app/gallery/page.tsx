// app/gallery/page.tsx

import { Suspense } from 'react';
import { fetchArtworks } from '@/app/lib/artworks-data';
import ArtworkGrid from '@/app/ui/gallery/grid';

export default async function GalleryPage({
  searchParams,
}: {
  // Corrected type definition for searchParams
  // It's a required object ({}), but its keys can be optional or undefined.
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // As per previous resolution, you are no longer directly accessing
  // searchParams properties here to avoid the "should be awaited" error.
  // The ArtworkGrid component handles useSearchParams on the client side.

  const artworks = await fetchArtworks();

  return (
    <main>
      <h1>Our Art Gallery</h1>
      <Suspense fallback={<div>Loading gallery content...</div>}>
        <ArtworkGrid artworks={artworks} />
      </Suspense>
    </main>
  );
}