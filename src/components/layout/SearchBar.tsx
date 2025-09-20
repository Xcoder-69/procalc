'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { calculators } from '@/lib/calculators-data';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof calculators>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = calculators.filter(calc =>
        calc.title.toLowerCase().includes(query.toLowerCase()) ||
        calc.shortDescription.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (slug: string) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/calculator/${slug}`);
  };

  return (
    <div className="relative w-full md:w-64" ref={searchRef}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search calculators..."
        className="pl-9 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length > 1 && setIsOpen(true)}
      />
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-md bg-popover border shadow-lg z-50">
          <ul>
            {results.map(calc => (
              <li key={calc.slug}>
                <Link
                  href={`/calculator/${calc.slug}`}
                  onClick={() => handleSelect(calc.slug)}
                  className="flex items-center gap-3 p-3 hover:bg-accent transition-colors cursor-pointer"
                >
                  <Calculator className="h-5 w-5 text-muted-foreground" />
                  <div className='flex flex-col'>
                    <span className="font-medium text-sm text-popover-foreground">{calc.title}</span>
                    <span className="text-xs text-muted-foreground">{calc.category}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
