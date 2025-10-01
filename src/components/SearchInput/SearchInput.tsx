'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  ComboBox,
  Label,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from 'react-aria-components';
import { useAsyncList } from 'react-stately';

import {
  correctLocationData,
  formatLocationDisplay,
  formatLocationForSearch,
  getFlagUrl,
  type LocationData,
} from '@/utils/utils';

function SearchInput({
  onSelect,
}: {
  onSelect?: (loc: LocationData | null) => void;
}) {
  const [hasError, setHasError] = React.useState(false);

  const list = useAsyncList<LocationData>({
    async load({ signal, filterText }) {
      if (!filterText || filterText.length < 2) {
        setHasError(false);
        return { items: [] };
      }

      try {
        setHasError(false);

        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            filterText
          )}&count=8&language=en&format=json`,
          {
            signal,
          }
        );

        if (!response.ok) {
          throw new Error('Server error');
        }

        const data = await response.json();

        if (data.error) {
          throw new Error('API error');
        }
        const locations = (data.results || []) as LocationData[];
        const correctedLocations = locations.map(correctLocationData);
        return { items: correctedLocations };
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return { items: [] };
        }

        setHasError(true);
        return { items: [] };
      }
    },
  });

  const handleSelection = (key: React.Key | null) => {
    if (!key) {
      onSelect?.(null);
    }

    const locationId =
      typeof key === 'string' ? parseInt(key, 10) : Number(key);
    const location = list.items.find((item) => item.id === locationId);

    if (!location) return;

    const correctedLocations = correctLocationData(location);

    onSelect?.(correctedLocations);
  };

  return (
    <ComboBox
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      onSelectionChange={handleSelection}
      className="relative"
      allowsEmptyCollection
      menuTrigger="focus"
    >
      <Label className="sr-only">Search for a city or place</Label>
      <div className="relative">
        <Input
          className="rounded-12 peer w-full min-w-0 bg-neutral-800 py-5 ps-[60px] outline-0 placeholder:text-neutral-200 hover:bg-neutral-700 data-[focused]:shadow-(--my-shadow-input)"
          placeholder="Search for a place"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="none"
          viewBox="0 0 21 21"
          className="absolute top-[23px] left-6 transition-transform duration-300 ease-out peer-aria-expanded:scale-110 motion-reduce:transition-none"
        >
          <path
            fill="#D4D3D9"
            d="M19.844 18.82c.195.196.195.508 0 .664l-.899.899c-.156.195-.468.195-.664 0l-4.726-4.727a.63.63 0 0 1-.117-.351v-.508c-1.446 1.21-3.282 1.953-5.313 1.953A8.119 8.119 0 0 1 0 8.625C0 4.172 3.633.5 8.125.5c4.453 0 8.125 3.672 8.125 8.125 0 2.031-.781 3.906-1.992 5.313h.508c.117 0 .234.078.351.156l4.727 4.726ZM8.125 14.875a6.243 6.243 0 0 0 6.25-6.25c0-3.438-2.813-6.25-6.25-6.25a6.243 6.243 0 0 0-6.25 6.25 6.219 6.219 0 0 0 6.25 6.25Z"
          />
        </svg>
      </div>

      <Popover style={{ width: 'var(--trigger-width)' }}>
        <ListBox
          className="rounded-12 grid max-h-60 w-full gap-1 overflow-auto bg-neutral-800 p-2 outline-none"
          items={list.items}
          renderEmptyState={() => {
            // Show error state
            if (hasError) {
              return (
                <div className="px-2 py-3 text-center text-red-400">
                  Something went wrong. Please try again.
                </div>
              );
            }
            // Not enough characters
            if (list.filterText.length < 2) {
              return (
                <div className="px-2 py-2.5 text-neutral-300">
                  Type at least 2 characters
                </div>
              );
            }

            // loading to find places
            if (list.isLoading) {
              return (
                <div className="flex items-center gap-2.5 px-2 py-2.5 text-neutral-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                    className="animate-fast-spin"
                  >
                    <path
                      fill="#fff"
                      d="M9.25 1.5c0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25C6.75.812 7.281.25 8 .25c.688 0 1.25.563 1.25 1.25ZM8 13.25c.688 0 1.25.563 1.25 1.25 0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25 0-.688.531-1.25 1.25-1.25ZM15.75 8c0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25 0-.688.531-1.25 1.25-1.25.688 0 1.25.563 1.25 1.25Zm-13 0c0 .719-.563 1.25-1.25 1.25C.781 9.25.25 8.719.25 8c0-.688.531-1.25 1.25-1.25.688 0 1.25.563 1.25 1.25Zm.625-5.844c.719 0 1.25.563 1.25 1.25 0 .719-.531 1.25-1.25 1.25-.688 0-1.25-.531-1.25-1.25 0-.687.563-1.25 1.25-1.25Zm9.219 9.219c.687 0 1.25.531 1.25 1.25 0 .688-.563 1.25-1.25 1.25-.719 0-1.25-.563-1.25-1.25 0-.719.531-1.25 1.25-1.25Zm-9.219 0c.719 0 1.25.531 1.25 1.25 0 .688-.531 1.25-1.25 1.25-.688 0-1.25-.563-1.25-1.25 0-.719.563-1.25 1.25-1.25Z"
                    />
                  </svg>
                  <span>Search in progress</span>
                </div>
              );
            }

            // No locations found
            return (
              <div className="px-2 py-2.5 text-neutral-300">
                {`No locations found for "${list.filterText}"`}
              </div>
            );
          }}
        >
          {(location) => {
            const flagUrl = getFlagUrl(location.country_code, 'medium');
            return (
              <ListBoxItem
                key={location.id}
                id={location.id}
                textValue={formatLocationForSearch(location)}
                className="rounded-8 flex cursor-pointer items-center gap-2 px-2 py-2.5 outline-none hover:bg-neutral-700 data-[focused]:bg-neutral-700 data-[focused]:outline-1 data-[focused]:outline-neutral-600 data-[hovered]:bg-neutral-700"
              >
                {flagUrl && (
                  <Image
                    src={flagUrl}
                    alt={`${location.country} flag`}
                    width={24}
                    height={24}
                    className="rounded-4"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <span>{formatLocationDisplay(location)}</span>
              </ListBoxItem>
            );
          }}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

export default SearchInput;
