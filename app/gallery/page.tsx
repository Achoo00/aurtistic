import ArtworkGrid from '@/app/ui/gallery/grid';
import { fetchArtworks } from '@/app/lib/artworks-data';

export default async function GalleryPage() {
  const artworks = await fetchArtworks();
  
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Art Gallery</h1>
        <ArtworkGrid artworks={artworks} />
      </div>
    </main>
  );
}