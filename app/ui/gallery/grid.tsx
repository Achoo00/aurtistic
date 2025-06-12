'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ArtworkModal from './artwork-modal';
import Filters from './filters';
import SearchBar from './search';

interface Artwork {
  id: string;
  title: string;
  description: string;
  tags: string[];
  artist: string;
  date_uploaded: string;
  image_url: string;
}

interface Filters {
  artists: string[];
  tags: string[];
  dateRange: string | null;
}

export default function ArtworkGrid({ artworks }: { artworks: Artwork[] }) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    artists: [],
    tags: [],
    dateRange: null,
  });
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  // Filter and search artworks
  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      // Search filter
      if (searchQuery) {
        const matchesSearch = 
          artwork.title.toLowerCase().includes(searchQuery) ||
          artwork.description.toLowerCase().includes(searchQuery);
        if (!matchesSearch) return false;
      }

      // Artist filter
      if (activeFilters.artists.length > 0 && !activeFilters.artists.includes(artwork.artist)) {
        return false;
      }

      // Tags filter (artwork must have at least one selected tag)
      if (activeFilters.tags.length > 0 && !artwork.tags.some(tag => activeFilters.tags.includes(tag))) {
        return false;
      }

      // Date filter
      if (activeFilters.dateRange) {
        const artworkDate = new Date(artwork.date_uploaded);
        const artworkMonth = `${artworkDate.toLocaleString('default', { month: 'long' })} ${artworkDate.getFullYear()}`;
        if (artworkMonth !== activeFilters.dateRange) {
          return false;
        }
      }

      return true;
    });
  }, [artworks, activeFilters, searchQuery]);

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <SearchBar />
        </div>
        <Filters 
          artworks={artworks}
          onFilterChange={setActiveFilters}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredArtworks.map((artwork) => (
          <div
            key={artwork.id}
            className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedArtwork(artwork)}
          >
            <div className="aspect-square relative">
              <Image
                src={artwork.image_url}
                alt={artwork.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{artwork.title}</h3>
              <p className="text-sm text-gray-500">by {artwork.artist}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {artwork.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {artwork.tags.length > 3 && (
                  <span className="inline-block px-2 py-1 text-xs text-gray-400">
                    +{artwork.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={selectedArtwork !== null}
        onClose={() => setSelectedArtwork(null)}
      />
    </div>
  );
}