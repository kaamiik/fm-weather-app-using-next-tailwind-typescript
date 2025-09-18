"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "../SearchInput";
import SearchButton from "../SearchButton";
import type { LocationData } from "../SearchInput";

function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = React.useState<LocationData | null>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selected) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("place", selected.name);
    params.set("lat", selected.latitude.toString());
    params.set("long", selected.longitude.toString());

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 md:gap-4 md:grid-cols-[1fr_auto] max-w-[41rem] mx-auto text-600"
    >
      <React.Suspense fallback={<div>Loading...</div>}>
        <SearchInput onSelect={setSelected} />
      </React.Suspense>
      <SearchButton loading={isPending} />
    </form>
  );
}

export default SearchForm;
