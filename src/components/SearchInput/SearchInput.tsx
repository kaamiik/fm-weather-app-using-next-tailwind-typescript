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

      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            filterText
          )}&count=5&language=en&format=json`,
          {
            signal,
          }
        );

        if (!response.ok) {
          console.error(
            "Open-Meteo API error:",
            response.status,
            response.statusText
          );
          throw new Error("Failed to fetch locations");
        }

        const data = await response.json();
        return { items: data.results || [] };
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return { items: [] };
        }
        console.error(error);
        return { items: [] };
      }
    },
  });

  const handleSelection = (key: React.Key | null) => {
    if (!key) return;

    const locationId =
      typeof key === "string" ? parseInt(key, 10) : Number(key);
    const location = list.items.find((item) => item.id === locationId);

    if (!location) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("place", location.name);
    params.set("lat", location.latitude.toString());
    params.set("long", location.longitude.toString());

    router.replace(`/?${params.toString()}`);
  };

  return (
    <ComboBox
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      onSelectionChange={handleSelection}
      className="relative"
      shouldFocusWrap
      allowsEmptyCollection
      menuTrigger="focus"
    >
      <div className="relative">
        <Input
          className="bg-neutral-800 py-4 ps-[60px] w-full placeholder:text-neutral-200 rounded-12 outline-0 min-w-0 hover:bg-neutral-700 data-[focused]:shadow-(--my-shadow-input)"
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
        <ListBox
          className="p-2 bg-neutral-800 w-full rounded-12 max-h-60 overflow-auto outline-none grid gap-1"
          items={list.items}
          renderEmptyState={() => {
            // Not enough characters
            if (list.filterText.length < 2) {
              return (
                <div className="py-2.5 px-2 text-neutral-300">
                  Type at least 2 characters
                </div>
              );
            }

            // loading to find places
            if (list.isLoading) {
              return (
                <div className="py-2.5 px-2 text-neutral-300 flex items-center gap-2.5">
                  <Image
                    src={`/assets/images/icon-loading.svg`}
                    alt=""
                    width={16}
                    height={19}
                    className="animate-spin"
                  />
                  <span>Search in progress</span>
                </div>
              );
            }

            // No locations found
            return (
              <div className="py-2.5 px-2 text-neutral-300">
                {`No locations found for "${list.filterText}"`}
              </div>
            );
          }}
        >
          {(location) => (
            <ListBoxItem
              key={location.id}
              id={location.id}
              textValue={`${location.name}, ${location.country}${
                location.admin1 ? `, ${location.admin1}` : ""
              }`}
              className="py-2.5 px-2 cursor-pointer outline-none hover:bg-neutral-700 rounded-8 data-[hovered]:bg-neutral-700 data-[focused]:bg-neutral-700 data-[focused]:outline-1 data-[focused]:outline-neutral-600"
            >
              {location.name}, {location.country}, {location.admin1}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

export default SearchInput;
