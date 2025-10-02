import * as React from 'react';
import DetailsCard from '../DetailsCard';
import { formatTime, getAQICategory, getUVCategory } from '@/utils/utils';

type WeatherDetailsProps = {
  current?: {
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    visibility?: number;
    european_aqi?: number | null;
  };
  daily?: {
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
  };
  tempUnit?: string;
  windUnit?: string;
  precipUnit?: string;
};

function WeatherDetails({
  current,
  daily,
  tempUnit,
  windUnit,
  precipUnit,
}: WeatherDetailsProps) {
  if (!current) return null;

  const tempSymbol = tempUnit === 'imperial' ? '°F' : '°C';
  const windSymbol = windUnit === 'imperial' ? ' mph' : ' km/h';
  const precipSymbol = precipUnit === 'imperial' ? ' in' : ' mm';

  const uvIndex = daily?.uv_index_max?.[0];
  const uvDisplay =
    uvIndex !== null && uvIndex !== undefined
      ? `${Math.round(uvIndex)} - ${getUVCategory(uvIndex)}`
      : null;

  const sunrise = daily?.sunrise?.[0] ? formatTime(daily.sunrise[0]) : null;
  const sunset = daily?.sunset?.[0] ? formatTime(daily.sunset[0]) : null;

  const visibility =
    current.visibility !== undefined
      ? windUnit === 'imperial'
        ? `${(current.visibility / 1609.34).toFixed(1)} mi`
        : `${(current.visibility / 1000).toFixed(1)} km`
      : null;

  const aqiValue = current.european_aqi;
  const aqiDisplay =
    aqiValue !== null && aqiValue !== undefined
      ? `${Math.round(aqiValue)} - ${getAQICategory(aqiValue)}`
      : null;

  return (
    <section aria-labelledby="current-conditions-heading">
      <h3 id="current-conditions-heading" className="sr-only">
        Current Weather Conditions
      </h3>
      <dl className="grid grid-cols-(--my-grid-cols-info) gap-4">
        <DetailsCard
          label="Feels Like"
          value={
            current
              ? `${Math.round(current.apparent_temperature)}${tempSymbol}`
              : '--'
          }
        />
        <DetailsCard
          label="Humidity"
          value={current ? `${current.relative_humidity_2m}%` : '--'}
        />
        <DetailsCard
          label="Wind"
          value={
            current
              ? `${Math.round(current.wind_speed_10m)}${windSymbol}`
              : '--'
          }
        />
        <DetailsCard
          label="Precipitation"
          value={current ? `${current.precipitation}${precipSymbol}` : '--'}
        />
        <DetailsCard
          label="UV Index"
          value={uvIndex !== undefined ? uvDisplay : '--'}
        />
        <DetailsCard label="Visibility" value={visibility || '--'} />
        <DetailsCard label="Air Quality" value={aqiDisplay || '--'} />
        <DetailsCard
          label="Sunrise/ Sunset"
          value={sunrise && sunset ? `${sunrise}/ ${sunset}` : '--'}
        />
      </dl>
    </section>
  );
}

export default WeatherDetails;
