// app/gallery/page.tsx

import { Suspense } from 'react';
import { fetchArtworks } from '@/app/lib/artworks-data';
import ArtworkGrid from '@/app/ui/gallery/grid';

export default async function GalleryPage({
  // Type searchParams as a Promise that resolves to the actual search params object.
  // We'll rename the prop in destructuring to make it clear it's the Promise.
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // AWAIT the searchParams Promise to get the actual search params object.
  const searchParams = await searchParamsPromise;

  // Now, 'searchParams' is the resolved object ({ [key: string]: string | string[] | undefined }).
  // You are currently not accessing its properties here, which is fine,
  // as ArtworkGrid uses useSearchParams on the client side.

  const artworks = await fetchArtworks();

  return (
    <main>
      <h1>Our Art Gallery</h1>
      <Suspense fallback={<div>Loading gallery content...</div>}>
        {/* Pass the artworks prop. ArtworkGrid will use its own useSearchParams(). */}
        <ArtworkGrid artworks={artworks} />
      </Suspense>
    </main>
  );
}