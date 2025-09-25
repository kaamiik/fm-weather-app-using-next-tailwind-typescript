import SearchForm from "@/components/SearchForm";
import { bricolageGrotesque } from "./layout";
import React from "react";
import WeatherInfo from "@/components/WeatherInfo";
import WeatherDetails from "@/components/WeatherDetails";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";

type SearchParams = {
  place?: string;
  lat?: string;
  long?: string;
  temp?: string;
  wind?: string;
  precip?: string;
  day?: string;
};

type WeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    rain_sum: number[];
    showers_sum: number[];
    snowfall_sum: number[];
    precipitation_sum: number[];
    precipitation_hours: number[];
    wind_speed_10m_max: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    temperature_80m: number[];
  };
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
};

async function fetchWeatherData(
  lat: string,
  lng: string,
  tempUnit: string = "metric",
  windUnit: string = "metric",
  precipUnit: string = "metric"
): Promise<WeatherData> {
  const tempUnitParam = tempUnit === "imperial" ? "fahrenheit" : "celsius";
  const windUnitParam = windUnit === "imperial" ? "mph" : "kmh";
  const precipUnitParam = precipUnit === "imperial" ? "inch" : "mm";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,temperature_80m&daily=temperature_2m_min,temperature_2m_max,weather_code,sunrise,sunset,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,wind_speed_10m_max&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m,precipitation&timezone=auto&temperature_unit=${tempUnitParam}&wind_speed_unit=${windUnitParam}&precipitation_unit=${precipUnitParam}&forecast_days=7`;

  const response = await fetch(url, { next: { revalidate: 600 } });

  if (!response.ok) {
    throw new Error(
      `Weather API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  let weatherData: WeatherData | null = null;
  let error: string | null = null;
  const { place, lat, long, temp, wind, precip } = await searchParams;

  if (lat && long) {
    try {
      weatherData = await fetchWeatherData(
        lat,
        long,
        temp || "metric",
        wind || "metric",
        precip || "metric"
      );
    } catch (err) {
      error =
        err instanceof Error ? err.message : "Failed to fetch weather data";
      console.error("Weather fetch error:", err);
    }
  }

  return (
    <main className="grid gap-12 lg:gap-16">
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
      {weatherData ? (
        <div className="grid gap-8 xl:grid-cols-[2fr_1fr] xl:grid-rows-[auto_auto] xl:gap-8">
          {/* Weather Info Container */}
          <div className="grid gap-5 xl:col-start-1 xl:row-start-1">
            <WeatherInfo
              place={place}
              current={weatherData?.current}
              tempUnit={(await searchParams).temp}
            />

            <WeatherDetails
              current={weatherData?.current}
              tempUnit={temp}
              windUnit={wind}
              precipUnit={precip}
            />
          </div>

          {/* Daily Forecast Container */}
          <DailyForecast
            daily={weatherData?.daily}
            tempUnit={(await searchParams).temp}
            className="xl:col-start-1 xl:row-start-2 self-end"
          />

          {/* Hourly Forecast Container */}
          <HourlyForecast
            hourly={weatherData?.hourly}
            tempUnit={(await searchParams).temp}
            selectedDay={(await searchParams).day}
            className="xl:col-start-2 xl:row-span-full max-h-[43rem]"
          />
        </div>
      ) : (
        <span className="text-center text-800 md:text-900 mt-16">
          Search for a Place
        </span>
      )}
    </main>
  );
}
