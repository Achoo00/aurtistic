'use client';

import { useState, useEffect } from 'react';

interface FiltersProps {
  artworks: {
    artist: string;
    tags: string[];
    date_uploaded: string;
  }[];
  onFilterChange: (filters: {
    artists: string[];
    tags: string[];
    dateRange: string | null;
  }) => void;
}

export default function Filters({ artworks, onFilterChange }: FiltersProps) {
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Extract unique artists and tags
  const uniqueArtists = Array.from(new Set(artworks.map(art => art.artist))).sort();
  const uniqueTags = Array.from(new Set(artworks.flatMap(art => art.tags))).sort();

  // Generate date options (monthly groupings)
  const dateOptions = Array.from(
    new Set(
      artworks.map(art => {
        const date = new Date(art.date_uploaded);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      })
    )
  ).sort().reverse();

  // Update filters whenever selections change
  useEffect(() => {
    onFilterChange({
      artists: selectedArtists,
      tags: selectedTags,
      dateRange: selectedDate,
    });
  }, [selectedArtists, selectedTags, selectedDate, onFilterChange]);

  // Handle multi-select changes
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const values = Array.from(e.target.selectedOptions).map(option => option.value);
    setter(values);
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Artist Filter */}
          <div className="flex flex-col">
            <label htmlFor="artist-filter" className="mb-2 text-sm font-medium text-gray-700">
              Filter by Artist
            </label>
            <select
              id="artist-filter"
              multiple
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 min-h-[8rem] text-sm bg-white shadow-sm hover:border-gray-300 transition-colors"
              value={selectedArtists}
              onChange={(e) => handleSelectChange(e, setSelectedArtists)}
            >
              {uniqueArtists.map((artist) => (
                <option key={artist} value={artist} className="py-1">
                  {artist}
                </option>
              ))}
            </select>
            {selectedArtists.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedArtists.map((artist) => (
                  <span
                    key={artist}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                  >
                    {artist}
                    <button
                      onClick={() => setSelectedArtists(prev => prev.filter(a => a !== artist))}
                      className="ml-1 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tags Filter */}
          <div className="flex flex-col">
            <label htmlFor="tag-filter" className="mb-2 text-sm font-medium text-gray-700">
              Filter by Tags
            </label>
            <select
              id="tag-filter"
              multiple
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 min-h-[8rem] text-sm bg-white shadow-sm hover:border-gray-300 transition-colors"
              value={selectedTags}
              onChange={(e) => handleSelectChange(e, setSelectedTags)}
            >
              {uniqueTags.map((tag) => (
                <option key={tag} value={tag} className="py-1">
                  {tag}
                </option>
              ))}
            </select>
            {selectedTags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-50 text-green-700"
                  >
                    {tag}
                    <button
                      onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                      className="ml-1 hover:text-green-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Date Filter */}
          <div className="flex flex-col">
            <label htmlFor="date-filter" className="mb-2 text-sm font-medium text-gray-700">
              Filter by Date
            </label>
            <select
              id="date-filter"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 text-sm bg-white shadow-sm hover:border-gray-300 transition-colors"
              value={selectedDate || ''}
              onChange={(e) => setSelectedDate(e.target.value || null)}
            >
              <option value="">Any date</option>
              {dateOptions.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            {selectedDate && (
              <div className="mt-2 flex">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-purple-50 text-purple-700">
                  {selectedDate}
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="ml-1 hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
