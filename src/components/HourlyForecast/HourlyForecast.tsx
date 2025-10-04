'use client';

import * as React from 'react';
import DaysDropdown from '../DaysDropdown';
import HourlyWeatherCard from '../HourlyWeatherCard';
import { getAvailableDays, getCurrentDay, getHoursForDay } from '@/utils/utils';
import { useRouter, useSearchParams } from 'next/navigation';

function HourlyForecast({
  hourly,
  tempUnit = 'metric',
  selectedDay,
  className = '',
}: {
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  tempUnit?: string;
  selectedDay?: string;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentDayFromData = getCurrentDay(hourly);
  const activeDay = selectedDay || currentDayFromData;

  const availableDays = getAvailableDays(hourly);
  const hoursToDisplay = activeDay ? getHoursForDay(activeDay, hourly) : [];

  function handleDayChange(day: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('day', day);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  if (!hourly?.time) return null;

  return (
    <section
      aria-labelledby="hourly-forecast-heading"
      className={`rounded-20 grid gap-4 bg-neutral-800 px-4 py-5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id="hourly-forecast-heading" className="text-600 font-semibold">
          Hourly forecast
        </h3>
        <DaysDropdown
          selectedDay={activeDay}
          availableDays={availableDays}
          onDayChange={handleDayChange}
        />
      </div>
      <ul
        aria-live="polite"
        className="scroll-bar group relative grid gap-4 overflow-y-auto outline-0 focus:shadow-(--my-shadow-menu-button)"
      >
        {hoursToDisplay.length > 0
          ? hoursToDisplay.map((hourData, index) => (
              <HourlyWeatherCard
                key={`${hourData.time}-${index}`}
                hour={hourData.time}
                temp={`${hourData.temperature}°`}
                weatherCode={hourData.weatherCode}
                tempUnit={tempUnit}
              />
            ))
          : // Fallback when no data
            Array.from({ length: 24 }).map((_, index) => (
              <HourlyWeatherCard
                key={index}
                hour="--"
                temp="--"
                weatherCode={0}
                tempUnit={tempUnit}
              />
            ))}
      </ul>
    </section>
  );
}

export default HourlyForecast;
