import { useCallback, useMemo, useState } from 'react';
import type { Donor, SearchFilters } from '../types/donor';
import { mockDonors } from '../data/mockDonors';

// TODO: Replace with AI API call when backend is ready
export function searchDonors(query: string, filters: SearchFilters): Donor[] {
  let results = [...mockDonors];

  if (filters.location) {
    const loc = filters.location.toLowerCase();
    results = results.filter((d) => d.location.toLowerCase().includes(loc));
  }

  if (filters.bloodType) {
    results = results.filter((d) => d.bloodType === filters.bloodType);
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      (d) =>
        d.bloodType.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q)
    );
  }

  return results.filter((d) => d.available);
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    bloodType: '',
  });

  const donors = useMemo(() => searchDonors(query, filters), [query, filters]);

  const updateQuery = useCallback((q: string) => setQuery(q), []);
  const updateFilters = useCallback((f: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...f }));
  }, []);
  const clearFilters = useCallback(() => {
    setQuery('');
    setFilters({ location: '', bloodType: '' });
  }, []);

  return { query, filters, donors, updateQuery, updateFilters, clearFilters };
}
