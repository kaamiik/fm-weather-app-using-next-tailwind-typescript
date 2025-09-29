import * as React from "react";

function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.3s] motion-reduce:animate-none"></div>
      <div className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.15s] motion-reduce:animate-none"></div>
      <div className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce motion-reduce:animate-none"></div>
    </div>
  );
}

function WeatherSkeleton() {
  const weatherDetailsLabel = [
    "Feels Like",
    "Humidity",
    "Wind",
    "Precipitation",
  ];
  return (
    <div className="grid gap-8 xl:grid-cols-[2fr_1fr] xl:grid-rows-[auto_auto] xl:gap-8">
      {/* Weather Info Card Skeleton */}
      <div className="grid gap-5 xl:col-start-1 xl:row-start-1">
        <div className="py-10 px-6 md:py-20 bg-neutral-800 rounded-20 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 animate-pulse relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 rounded-20">
            <LoadingDots />
            <p className="text-neutral-300 mt-3 text-500" aria-live="assertive">
              Loading...
            </p>
          </div>

          <div className="text-center flex flex-col gap-3 md:text-start md:gap-6 max-w-[24rem]">
            <div className="h-7 bg-neutral-700 rounded-8 w-48"></div>
            <div className="h-6 bg-neutral-700 rounded-6 w-40"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[120px] h-[120px] bg-neutral-700 rounded-full"></div>
            <div className="h-20 bg-neutral-700 rounded-12 w-24"></div>
          </div>
        </div>

        {/* Weather Details Cards Skeleton */}
        <div className="grid gap-4 grid-cols-(--my-grid-cols-info) text-neutral-0">
          {weatherDetailsLabel.map((label, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-6 rounded-12 p-4 bg-neutral-800 border border-neutral-600 animate-pulse"
            >
              <div className="h-5 rounded-4 w-20">{label}</div>
              <div className="h-5 rounded-6 w-16">&#8212;</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Forecast Skeleton */}
      <div className="xl:col-start-1 xl:row-start-2 self-end">
        <div className="h-6 bg-neutral-700 rounded-6 w-32 mb-5 animate-pulse"></div>
        <div className="grid gap-4 grid-cols-(--my-grid-cols-daily)">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="p-2.5 flex flex-col gap-4 bg-neutral-800 border border-neutral-600 rounded-12 animate-pulse"
            >
              <div className="h-5 bg-neutral-700 rounded-4 w-12 mx-auto"></div>
              <div className="w-[60px] h-[60px] bg-neutral-700 rounded-full mx-auto"></div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-neutral-700 rounded-3 w-8"></div>
                <div className="h-4 bg-neutral-700 rounded-3 w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className="py-5 px-4 bg-neutral-800 rounded-20 grid gap-4 xl:col-start-2 xl:row-span-full max-h-[43rem] animate-pulse">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="h-6 bg-neutral-700 rounded-6 w-32"></div>
          <div className="h-10 bg-neutral-700 rounded-8 w-32"></div>
        </div>
        <div className="grid gap-4 relative overflow-y-auto scroll-bar">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="py-2.5 ps-3 pe-4 bg-neutral-700 border border-neutral-600 rounded-8 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-neutral-600 rounded-full"></div>
                <div className="h-5 bg-neutral-600 rounded-4 w-12"></div>
              </div>
              <div className="h-4 bg-neutral-600 rounded-3 w-8"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
