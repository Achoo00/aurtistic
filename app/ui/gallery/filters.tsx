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
    <div className="sticky top-0 z-10 bg-white shadow-sm p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Artist Filter */}
        <div className="flex flex-col">
          <label htmlFor="artist-filter" className="mb-2 text-sm font-medium text-gray-700">
            Filter by Artist
          </label>
          <select
            id="artist-filter"
            multiple
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
            value={selectedArtists}
            onChange={(e) => handleSelectChange(e, setSelectedArtists)}
          >
            {uniqueArtists.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Filter */}
        <div className="flex flex-col">
          <label htmlFor="tag-filter" className="mb-2 text-sm font-medium text-gray-700">
            Filter by Tags
          </label>
          <select
            id="tag-filter"
            multiple
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
            value={selectedTags}
            onChange={(e) => handleSelectChange(e, setSelectedTags)}
          >
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex flex-col">
          <label htmlFor="date-filter" className="mb-2 text-sm font-medium text-gray-700">
            Filter by Date
          </label>
          <select
            id="date-filter"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedDate || ''}
            onChange={(e) => setSelectedDate(e.target.value || null)}
          >
            <option value="">All Dates</option>
            {dateOptions.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(selectedArtists.length > 0 || selectedTags.length > 0 || selectedDate) && (
        <button
          onClick={() => {
            setSelectedArtists([]);
            setSelectedTags([]);
            setSelectedDate(null);
          }}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
        >
          Clear all filters
        </button>
      )}

      {/* Active Filters Display */}
      {(selectedArtists.length > 0 || selectedTags.length > 0 || selectedDate) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedArtists.map((artist) => (
            <span
              key={artist}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
            >
              {artist}
              <button
                onClick={() => setSelectedArtists(prev => prev.filter(a => a !== artist))}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                ×
              </button>
            </span>
          ))}
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              {tag}
              <button
                onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}
          {selectedDate && (
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {selectedDate}
              <button
                onClick={() => setSelectedDate(null)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
