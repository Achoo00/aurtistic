'use client';

import Image from 'next/image';
import { useState } from 'react';
import ArtworkModal from './artwork-modal';

interface Artwork {
  id: string;
  title: string;
  description: string;
  tags: string[];
  artist: string;
  date_uploaded: string;
  image_url: string;
}

export default function ArtworkGrid({ artworks }: { artworks: Artwork[] }) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {artworks.map((artwork) => (
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
    </>
  );
}