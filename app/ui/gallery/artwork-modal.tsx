'use client';

import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Artwork {
  id: string;
  title: string;
  description: string;
  tags: string[];
  artist: string;
  date_uploaded: string;
  image_url: string;
}

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, isOpen, onClose }: ArtworkModalProps) {
  if (!artwork || !isOpen) return null;

  const formattedDate = new Date(artwork.date_uploaded).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 hover:bg-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={artwork.image_url}
              alt={artwork.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold">{artwork.title}</h2>
            <p className="mt-2 text-lg text-gray-600">by {artwork.artist}</p>
            
            <div className="mt-4">
              <h3 className="font-semibold">Description</h3>
              <p className="mt-1 text-gray-600">{artwork.description}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Upload Date</h3>
              <p className="mt-1 text-gray-600">{formattedDate}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Tags</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
