import SearchForm from "@/components/SearchForm";
import { bricolageGrotesque } from "./layout";
import React from "react";
import WeatherSection from "@/components/WeatherSection";
import GeolocationHandler from "@/components/GeolocationHandler";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import type { Metadata } from "next";
import { cleanPlaceName } from "@/utils/utils";

type SearchParams = {
  place?: string;
  lat?: string;
  long?: string;
  temp?: string;
  wind?: string;
  precip?: string;
  day?: string;
  loading?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { place } = await searchParams;

  const cleanPlace = place ? cleanPlaceName(place) : null;

  return {
    title: cleanPlace ? `${cleanPlace}|Weather Now` : "Weather Now",
    description: cleanPlace
      ? `Current weather conditions, hourly and daily forecast for ${cleanPlace}`
      : "Search for any location to get current weather conditions and forecasts",
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { place, lat, long, temp, wind, precip, day, loading } =
    await searchParams;

  return (
    <main className="grid gap-12 lg:gap-16">
      <React.Suspense fallback={null}>
        <GeolocationHandler />
      </React.Suspense>
      <h1
        className={`${bricolageGrotesque.className} text-800 tn:text-900 font-bold text-center text-balance max-md:max-w-[30.125rem] mx-auto`}
      >
        {`How's the sky looking today?`}
      </h1>

      {/* Search Container */}
      <div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SearchForm />
        </React.Suspense>
      </div>

      {/* Content Container */}
      {loading === "location" ? (
        <WeatherSkeleton />
      ) : lat && long ? (
        <React.Suspense fallback={<WeatherSkeleton />}>
          <WeatherSection
            place={place}
            lat={lat}
            long={long}
            temp={temp}
            wind={wind}
            precip={precip}
            day={day}
          />
        </React.Suspense>
      ) : (
        <span
          className={`${bricolageGrotesque.className} text-center text-800 md:text-900 italic mt-16`}
        >
          Search for a Place
        </span>
      )}
    </main>
  );
}
