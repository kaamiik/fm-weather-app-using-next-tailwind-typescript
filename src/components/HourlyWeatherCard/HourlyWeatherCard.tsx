import * as React from "react";
import { getWeatherIcon, getTemperatureUnit } from "@/utils/utils";
import Image from "next/image";

function HourlyWeatherCard({
  weatherCode,
  hour,
  temp,
  tempUnit = "metric",
}: {
  weatherCode: number;
  hour: string;
  temp: string;
  tempUnit?: string;
}) {
  const weatherIcon = hour === "--" ? "unknown" : getWeatherIcon(weatherCode);
  const temperatureUnit = getTemperatureUnit(tempUnit);
  return (
    <li className="py-2.5 ps-3 pe-4 bg-neutral-700 border border-neutral-600 rounded-8 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Image
          src={`/assets/images/icon-${weatherIcon}.webp`}
          alt={
            hour === "--" ? "Loading weather data" : `Weather: ${weatherIcon}`
          }
          width={40}
          height={40}
        />
        <span className="text-600 font-medium">{hour}</span>
      </div>
      <span className="text-400 font-normal">
        {temp}
        <span className="sr-only">{temperatureUnit}</span>
      </span>
    </li>
  );
}

export default HourlyWeatherCard;
