"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ComboBox,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { useAsyncList } from "react-stately";

type LocationData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
};

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Async list loader
  const list = useAsyncList<LocationData>({
    async load({ signal, filterText }) {
      if (!filterText || filterText.length < 2) {
        return { items: [] };
      }

      // await new Promise((resolve) => setTimeout(resolve, 10000));

      try {
        const response = await fetch(
          `/api/locations?query=${encodeURIComponent(filterText)}`,
          { signal, cache: "no-store" } // no browser cache
        );

        if (!response.ok) throw new Error("Failed to fetch locations");

        const results = await response.json();
        return { items: results };
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return { items: [] };
        }
        console.error(error);
        return { items: [] };
      }
    },
  });

  // Handle selection of an item
  const handleSelection = (id: React.Key | null) => {
    const location = list.items.find((item) => item.id === id);
    if (!location) return;

    console.log("Location selected:", location);

    const params = new URLSearchParams(searchParams.toString());
    params.set("place", location.name);
    params.set("lat", location.latitude.toString());
    params.set("long", location.longitude.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <ComboBox
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      onSelectionChange={handleSelection}
      className="relative"
      shouldFocusWrap
    >
      <div className="relative">
        <Input
          className="bg-neutral-800 py-4 ps-[60px] w-full placeholder:text-neutral-200 rounded-12"
          placeholder="Search for a place"
        />
        <Image
          src={`/assets/images/icon-search.svg`}
          alt=""
          width={20}
          height={20}
          className="absolute top-[18px] left-6"
        />
      </div>

      <Popover style={{ width: "var(--trigger-width)" }}>
        <ListBox className="p-2 bg-neutral-800 w-full rounded-12 mt-1.5 grid gap-1">
          {/* Not enough characters */}
          {list.filterText.length < 2 && (
            <ListBoxItem
              id="less char"
              className="py-2.5 px-2 text-neutral-300"
            >
              Type at least 2 characters
            </ListBoxItem>
          )}

          {/* Loading state */}
          {list.isLoading && list.filterText.length >= 2 && (
            <ListBoxItem
              id="loading"
              className="py-2.5 px-2 text-neutral-300 flex items-center gap-2.5"
            >
              <Image
                src={`/assets/images/icon-loading.svg`}
                alt=""
                width={16}
                height={19}
              />
              <span>Search in progress</span>
            </ListBoxItem>
          )}

          {/* No results */}
          {list.loadingState === "idle" &&
            list.items.length === 0 &&
            list.filterText.length >= 2 && (
              <ListBoxItem className="py-2.5 px-2 text-neutral-300">
                {`No locations found for "${list.filterText}"`}
              </ListBoxItem>
            )}

          {/* Results */}
          {list.items.map((location) => (
            <ListBoxItem
              key={location.id}
              id={String(location.id)}
              textValue={`${location.name}, ${location.country}`}
              className="py-2.5 px-2 cursor-pointer hover:bg-neutral-700 rounded-8 hover:inset-ring hover:inset-ring-neutral-600"
            >
              {location.name}, {location.country}
              {location.admin1 && `, ${location.admin1}`}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

export default SearchInput;
