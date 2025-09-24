import * as React from "react";
import DetailsCard from "../DetailsCard";

type WeatherDetailsProps = {
  current?: {
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
  };
  tempUnit?: string;
  windUnit?: string;
  precipUnit?: string;
};

function WeatherDetails({
  current,
  tempUnit,
  windUnit,
  precipUnit,
}: WeatherDetailsProps) {
  if (!current) return null;

  const tempSymbol = tempUnit === "imperial" ? "°F" : "°C";
  const windSymbol = windUnit === "imperial" ? " mph" : " km/h";
  const precipSymbol = precipUnit === "imperial" ? " in" : " mm";
  return (
    <dl className="grid gap-4 grid-cols-(--my-grid-cols-info)">
      <DetailsCard
        label="Feels Like"
        value={
          current
            ? `${Math.round(current.apparent_temperature)}${tempSymbol}`
            : "--"
        }
      />
      <DetailsCard
        label="Humidity"
        value={current ? `${current.relative_humidity_2m}%` : "--"}
      />
      <DetailsCard
        label="Wind"
        value={
          current ? `${Math.round(current.wind_speed_10m)}${windSymbol}` : "--"
        }
      />
      <DetailsCard
        label="Precipitation"
        value={current ? `${current.precipitation}${precipSymbol}` : "--"}
      />
    </dl>
  );
}

export default WeatherDetails;
