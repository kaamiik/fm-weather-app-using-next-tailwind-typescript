import * as React from 'react';
import Image from 'next/image';
import {
  getWeatherIcon,
  getTemperatureUnit,
  cleanPlaceName,
} from '@/utils/utils';

function WeatherInfo({
  place,
  current,
  tempUnit = 'metric',
}: {
  place: string | undefined;
  current?: { temperature_2m: number; weather_code: number };
  tempUnit?: string;
}) {
  const today = new Date();
  const formattedDate = today.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const weatherIcon = current ? getWeatherIcon(current.weather_code) : 'sunny';
  const temperature = current ? Math.round(current.temperature_2m) : 20;
  const unit = getTemperatureUnit(tempUnit);

  const displayPlace = cleanPlaceName(place);

  return (
    <div className="rounded-20 flex flex-col items-center justify-between gap-4 bg-[url(/assets/images/bg-today-small.svg)] bg-cover bg-no-repeat px-6 py-10 sm:bg-[url(/assets/images/bg-today-large.svg)] md:flex-row md:gap-0 md:py-20">
      <div className="flex max-w-[24rem] flex-col gap-3 text-center md:gap-6 md:text-start">
        <h2 className="text-700 font-bold">{displayPlace}</h2>
        <time className="text-500 font-medium" dateTime={formattedDate}>
          {formattedDate}
        </time>
      </div>
      <div className="flex items-center gap-4">
        <Image
          src={`/assets/images/icon-${weatherIcon}.webp`}
          alt={weatherIcon}
          width={120}
          height={120}
        />
        <p className="text-900 tn:text-1000 font-semibold italic">
          {`${temperature}°`}
          <span className="sr-only">{unit}</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherInfo;
