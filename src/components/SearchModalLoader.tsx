'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SearchModal = dynamic(() => import('./SearchModal'), {
  ssr: false,
  loading: () => null,
});

export default function SearchModalLoader() {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openSearch = () => {
      setLoaded(true);
      setOpen(true);
    };

    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener('open-search', openSearch);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('open-search', openSearch);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!loaded) return null;

  return <SearchModal open={open} onOpenChange={setOpen} />;
}
