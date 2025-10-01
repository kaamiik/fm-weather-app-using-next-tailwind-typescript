import * as React from 'react';

function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-300 [animation-delay:-0.3s] motion-reduce:animate-none"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-300 [animation-delay:-0.15s] motion-reduce:animate-none"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-300 motion-reduce:animate-none"></div>
    </div>
  );
}

function WeatherSkeleton() {
  const weatherDetailsLabel = [
    'Feels Like',
    'Humidity',
    'Wind',
    'Precipitation',
    'UV Index',
    'Visibility',
    'Air Quality',
    'Sun Times',
  ];
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      role="alert"
      className="grid gap-8 xl:grid-cols-[2fr_1fr] xl:grid-rows-[auto_auto] xl:gap-8"
    >
      {/* Weather Info Card Skeleton */}
      <div className="grid gap-5 xl:col-start-1 xl:row-start-1">
        <div className="rounded-20 relative flex animate-pulse flex-col items-center justify-between gap-4 bg-neutral-800 px-6 py-10 motion-reduce:animate-none md:flex-row md:gap-0 md:py-20">
          <div className="rounded-20 absolute inset-0 flex flex-col items-center justify-center bg-neutral-800">
            <LoadingDots />
            <p className="text-500 mt-3 text-neutral-300">Loading...</p>
          </div>

          <div
            aria-hidden="true"
            className="flex max-w-[24rem] flex-col gap-3 text-center md:gap-6 md:text-start"
          >
            <div className="rounded-8 h-7 w-48 bg-neutral-700"></div>
            <div className="rounded-6 h-6 w-40 bg-neutral-700"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-[120px] w-[120px] rounded-full bg-neutral-700"></div>
            <div className="rounded-12 h-20 w-24 bg-neutral-700"></div>
          </div>
        </div>

        {/* Weather Details Cards Skeleton */}
        <div
          aria-hidden="true"
          className="text-neutral-0 grid grid-cols-(--my-grid-cols-info) gap-4"
        >
          {weatherDetailsLabel.map((label, index) => (
            <div
              key={index}
              className="rounded-12 flex animate-pulse flex-col items-start gap-6 border border-neutral-600 bg-neutral-800 p-4 motion-reduce:animate-none"
            >
              <div className="rounded-4 h-5 w-20">{label}</div>
              <div className="rounded-6 h-5 w-16">&#8212;</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Forecast Skeleton */}
      <div
        aria-hidden="true"
        className="self-end xl:col-start-1 xl:row-start-2"
      >
        <div className="rounded-6 mb-5 h-6 w-32 animate-pulse bg-neutral-700 motion-reduce:animate-none"></div>
        <div className="grid grid-cols-(--my-grid-cols-daily) gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="rounded-12 flex animate-pulse flex-col gap-4 border border-neutral-600 bg-neutral-800 p-2.5 motion-reduce:animate-none"
            >
              <div className="rounded-4 mx-auto h-5 w-12 bg-neutral-700"></div>
              <div className="mx-auto h-[60px] w-[60px] rounded-full bg-neutral-700"></div>
              <div className="flex items-center justify-between">
                <div className="rounded-3 h-4 w-8 bg-neutral-700"></div>
                <div className="rounded-3 h-4 w-8 bg-neutral-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast Skeleton */}
      <div
        aria-hidden="true"
        className="rounded-20 grid max-h-[43rem] animate-pulse gap-4 bg-neutral-800 px-4 py-5 motion-reduce:animate-none xl:col-start-2 xl:row-span-full xl:max-h-none xl:contain-size"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="rounded-6 h-6 w-32 bg-neutral-700"></div>
          <div className="rounded-8 h-10 w-32 bg-neutral-700"></div>
        </div>
        <div className="scroll-bar relative grid gap-4 overflow-y-auto">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="rounded-8 flex items-center justify-between gap-2 border border-neutral-600 bg-neutral-700 py-2.5 ps-3 pe-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-neutral-600"></div>
                <div className="rounded-4 h-5 w-12 bg-neutral-600"></div>
              </div>
              <div className="rounded-3 h-4 w-8 bg-neutral-600"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
