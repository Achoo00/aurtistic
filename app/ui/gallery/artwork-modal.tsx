'use client';

import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

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

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formattedDate = new Date(artwork.date_uploaded).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden animate-modal">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
              <Image
                src={artwork.image_url}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h2 id="modal-title" className="text-2xl font-bold">{artwork.title}</h2>
                <p className="mt-1.5 text-lg text-gray-600">by {artwork.artist}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{artwork.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Upload Date</h3>
                <p className="mt-2 text-gray-600">{formattedDate}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Tags</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
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
    </div>
  );
}
