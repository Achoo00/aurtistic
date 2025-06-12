'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Update the URL with the search param
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search artworks
      </label>
      <input
        id="search"
        className="peer block w-full rounded-lg border border-gray-200 py-2.5 pl-10 text-sm outline-2 placeholder:text-gray-500
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-gray-300 transition-colors"
        placeholder="Search artworks by title or description..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon 
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 
          peer-focus:text-blue-500 transition-colors" 
      />
    </div>
  );
}
