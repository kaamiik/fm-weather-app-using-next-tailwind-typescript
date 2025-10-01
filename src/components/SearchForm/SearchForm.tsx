'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchInput from '../SearchInput';
import SearchButton from '../SearchButton';
import { formatLocationForURL, type LocationData } from '@/utils/utils';

function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = React.useState<LocationData | null>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selected) return;

    const params = new URLSearchParams(searchParams.toString());

    const formatedPlace = formatLocationForURL(selected);

    params.set('place', formatedPlace);
    params.set('lat', selected.latitude.toString());
    params.set('long', selected.longitude.toString());

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="text-600 mx-auto grid max-w-[41rem] gap-3 md:grid-cols-[1fr_auto] md:gap-4"
    >
      <React.Suspense fallback={<div>Loading...</div>}>
        <SearchInput onSelect={setSelected} />
      </React.Suspense>
      <SearchButton loading={isPending} />
    </form>
  );
}

export default SearchForm;
