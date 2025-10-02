'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import {
  MenuTrigger,
  Menu,
  MenuItem,
  MenuSection,
  Header,
  Separator,
  Button,
  Popover,
} from 'react-aria-components';

function UnitSettings() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const temperature = searchParams.get('temp') || 'metric';
  const windSpeed = searchParams.get('wind') || 'metric';
  const precipitation = searchParams.get('precip') || 'metric';

  const isLoading = searchParams.get('loading') === 'location';

  const selectedKeys = new Set([
    `${temperature}-temp`,
    `${windSpeed}-wind`,
    `${precipitation}-precip`,
  ]);

  function CheckMark({ isSelected }: { isSelected: boolean }) {
    return (
      <span aria-hidden="true">
        {isSelected ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="17"
            fill="none"
            viewBox="0 0 14 11"
          >
            <path
              fill="#fff"
              d="M11.895 1.047c.136-.137.355-.137.464 0l.793.766c.11.136.11.355 0 .464L4.95 10.48a.315.315 0 0 1-.465 0L.82 6.844c-.11-.137-.11-.356 0-.465l.793-.793c.11-.11.328-.11.465 0l2.625 2.652 7.192-7.191Z"
            />
          </svg>
        ) : null}
      </span>
    );
  }

  function handleSwitch() {
    const unit = temperature === 'metric' ? 'imperial' : 'metric';
    const params = new URLSearchParams(searchParams.toString());
    params.set('temp', unit);
    params.set('wind', unit);
    params.set('precip', unit);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function handleUnitChange(unitType: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(unitType, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const allUnitsSame = temperature === windSpeed && windSpeed === precipitation;

  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <MenuTrigger>
        <Button
          isDisabled={isLoading}
          className="rounded-6 md:rounded-8 group flex cursor-pointer items-center gap-1.5 bg-neutral-800 px-2.5 py-2 outline-0 hover:bg-neutral-700 focus:shadow-(--my-shadow-menu-button) disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:opacity-50 md:gap-2.5 md:px-3 md:py-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
            className="transition-transform duration-150 ease-out group-aria-expanded:rotate-45 motion-reduce:transition-none motion-reduce:group-aria-expanded:rotate-none"
          >
            <path
              fill="#fff"
              d="M14.125 7.406c.031.407.031.813 0 1.188l1 .594a.74.74 0 0 1 .344.843c-.344 1.313-1.063 2.5-2 3.469-.25.219-.625.281-.906.125l-1-.594c-.25.188-.72.469-1.032.594v1.156a.733.733 0 0 1-.562.719A7.765 7.765 0 0 1 6 15.5c-.313-.063-.563-.406-.563-.719v-1.156a5.54 5.54 0 0 1-1.03-.594l-1 .594c-.282.156-.657.094-.907-.125-.938-.969-1.656-2.156-2-3.469a.74.74 0 0 1 .344-.844l1-.593c-.032-.156-.032-.406-.032-.594 0-.156 0-.406.032-.594l-1-.562A.74.74 0 0 1 .5 6c.344-1.313 1.063-2.5 2-3.469.25-.219.625-.281.906-.125l1 .594c.25-.188.719-.469 1.032-.594V1.25c0-.344.218-.625.562-.719a7.766 7.766 0 0 1 3.969 0c.312.063.562.406.562.719v1.156c.313.125.781.406 1.031.594l1-.594c.282-.156.657-.094.907.125.937.969 1.656 2.156 2 3.469a.74.74 0 0 1-.344.844l-1 .562Zm-1.656 2c.25-1.312.25-1.469 0-2.781l1.375-.781c-.188-.563-.688-1.375-1.063-1.813l-1.375.782c-.969-.844-1.125-.938-2.375-1.375V1.843C8.75 1.812 8.281 1.75 8 1.75c-.313 0-.781.063-1.063.094v1.593c-1.25.438-1.375.532-2.375 1.376L3.188 4.03c-.468.532-.812 1.157-1.062 1.813l1.375.781c-.25 1.313-.25 1.469 0 2.781l-1.375.781c.188.563.688 1.376 1.063 1.813l1.374-.781c.97.844 1.125.937 2.375 1.375v1.594c.282.03.75.093 1.063.093.281 0 .75-.062 1.031-.094v-1.593c1.25-.438 1.375-.531 2.375-1.375l1.375.781c.375-.438.875-1.25 1.063-1.813l-1.375-.78ZM8 5c1.625 0 3 1.375 3 3 0 1.656-1.375 3-3 3a3 3 0 0 1-3-3c0-1.625 1.344-3 3-3Zm0 4.5A1.5 1.5 0 0 0 9.5 8c0-.813-.688-1.5-1.5-1.5A1.5 1.5 0 0 0 6.5 8c0 .844.656 1.5 1.5 1.5Z"
            />
          </svg>
          <span className="text-300 md:text-400">Units</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="8"
            fill="none"
            viewBox="0 0 13 8"
            className="transition-transform duration-150 ease-out group-aria-expanded:rotate-180 motion-reduce:transition-none motion-reduce:group-aria-expanded:rotate-none"
          >
            <path
              fill="#fff"
              d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"
            />
          </svg>
        </Button>

        <Popover placement="bottom end" className="overflow-y-auto">
          <Menu
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            disallowEmptySelection
            onAction={(key) => {
              if (key === 'switch') {
                handleSwitch();
              }
            }}
            className="rounded-10 md:rounded-12 text-300 md:text-400 min-w-[10.5rem] border border-neutral-600 bg-neutral-800 px-2 py-1.5 shadow-lg outline-0"
          >
            <MenuItem
              id="switch"
              className="rounded-8 cursor-pointer px-2 py-2.5 outline-0 hover:bg-neutral-700 data-[focus-visible]:bg-neutral-700 data-[focus-visible]:shadow-(--my-shadow-menu-item)"
            >
              {allUnitsSame
                ? temperature === 'metric'
                  ? 'Switch to Imperial'
                  : 'Switch to Metric'
                : 'Reset to Default'}
            </MenuItem>

            <MenuSection>
              <Header className="text-300 px-2 pt-1.5 text-neutral-300">
                Temperature
              </Header>
              <MenuItem
                id="metric-temp"
                onAction={() => handleUnitChange('temp', 'metric')}
                className={`rounded-8 mt-2 flex cursor-pointer items-center justify-between px-2 py-2.5 outline-0 data-[focus-visible]:shadow-(--my-shadow-menu-item) ${
                  temperature === 'metric'
                    ? 'bg-neutral-700'
                    : 'hover:bg-neutral-700 data-[focus-visible]:bg-neutral-700'
                }`}
              >
                Celsius
                <CheckMark isSelected={temperature === 'metric'} />
              </MenuItem>
              <MenuItem
                id="imperial-temp"
                onAction={() => handleUnitChange('temp', 'imperial')}
                className={`rounded-8 mt-2 flex cursor-pointer items-center justify-between px-2 py-2.5 outline-0 data-[focus-visible]:shadow-(--my-shadow-menu-item) ${
                  temperature === 'imperial'
                    ? 'bg-neutral-700'
                    : 'hover:bg-neutral-700 data-[focus-visible]:bg-neutral-700'
                }`}
              >
                Fahrenheit
                <CheckMark isSelected={temperature === 'imperial'} />
              </MenuItem>
            </MenuSection>

            <Separator className="my-1 border border-neutral-600" />

            <MenuSection>
              <Header className="text-300 px-2 pt-1.5 text-neutral-300">
                Wind Speed
              </Header>
              <MenuItem
                id="metric-wind"
                onAction={() => handleUnitChange('wind', 'metric')}
                className={`rounded-8 mt-2 flex cursor-pointer items-center justify-between px-2 py-2.5 outline-0 data-[focus-visible]:shadow-(--my-shadow-menu-item) ${
                  windSpeed === 'metric'
                    ? 'bg-neutral-700'
                    : 'hover:bg-neutral-700 data-[focus-visible]:bg-neutral-700'
                }`}
              >
                Km/h
                <CheckMark isSelected={windSpeed === 'metric'} />
              </MenuItem>
              <MenuItem
                id="imperial-wind"
                onAction={() => handleUnitChange('wind', 'imperial')}
                className={`rounded-8 mt-2 flex cursor-pointer items-center justify-between px-2 py-2.5 outline-0 data-[focus-visible]:shadow-(--my-shadow-menu-item) ${
                  windSpeed === 'imperial'
                    ? 'bg-neutral-700'
                    : 'hover:bg-neutral-700 data-[focus-visible]:bg-neutral-700'
                }`}
              >
                mph
                <CheckMark isSelected={windSpeed === 'imperial'} />
              </MenuItem>
            </MenuSection>

            <Separator className="my-1 border border-neutral-600" />

            <MenuSection>
              <Header className="text-300 px-2 pt-1.5 text-neutral-300">
                Precipitation
              </Header>
              <MenuItem
                id="metric-precip"
                onAction={() => handleUnitChange('precip', 'metric')}
                className={`rounded-8 mt-2 flex cursor-pointer items-center justify-between px-2 py-2.5 outline-0 data-[focus-visible]:shadow-(--my-shadow-menu-item) ${
                  precipitation === 'metric'
                    ? 'bg-neutral-700'
                    : 'hover:bg-neutral-700 data-[focus-visible]:bg-neutral-700'
                }`}
              >
                Millimeters
                <CheckMark isSelected={precipitation === 'metric'} />
              </MenuItem>
              <MenuItem
                id="imperial-precip"
                onAction={() => handleUnitChange('precip', 'imperial')}
                className={`rounded-8 mt-2 flex cursor-pointer items-center justify-between px-2 py-2.5 outline-0 data-[focus-visible]:shadow-(--my-shadow-menu-item) ${
                  precipitation === 'imperial'
                    ? 'bg-neutral-700'
                    : 'hover:bg-neutral-700 data-[focus-visible]:bg-neutral-700'
                }`}
              >
                Inches
                <CheckMark isSelected={precipitation === 'imperial'} />
              </MenuItem>
            </MenuSection>
          </Menu>
        </Popover>
      </MenuTrigger>
      <button aria-hidden="true" className="sr-only" tabIndex={-1}>
        Submit
      </button>
    </form>
  );
}

export default UnitSettings;
