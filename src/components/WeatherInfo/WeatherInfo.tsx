import * as React from "react";
import Image from "next/image";
import {
  getWeatherIcon,
  getTemperatureUnit,
  cleanPlaceName,
} from "@/utils/utils";

function WeatherInfo({
  place,
  current,
  tempUnit = "metric",
}: {
  place: string | undefined;
  current?: { temperature_2m: number; weather_code: number };
  tempUnit?: string;
}) {
  const today = new Date();
  const formattedDate = today.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const weatherIcon = current ? getWeatherIcon(current.weather_code) : "sunny";
  const temperature = current ? Math.round(current.temperature_2m) : 20;
  const unit = getTemperatureUnit(tempUnit);

  const displayPlace = cleanPlaceName(place);

  return (
    <div className="py-10 px-6 md:py-20 bg-[url(/assets/images/bg-today-small.svg)] sm:bg-[url(/assets/images/bg-today-large.svg)] bg-no-repeat bg-cover rounded-20 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      <div className="text-center flex flex-col gap-3 md:text-start md:gap-6 max-w-[24rem]">
        <p className="text-700 font-bold">{displayPlace}</p>
        <time className="text-500 font-medium" dateTime={formattedDate}>
          {formattedDate}
        </time>
      </div>
      <div className="flex items-center gap-4">
        <Image
          src={`/assets/images/icon-${weatherIcon}.webp`}
          alt={`Weather: ${weatherIcon}`}
          width={120}
          height={120}
        />
        <h2 className="text-900 tn:text-1000 font-semibold italic">
          {`${temperature}°`}
          <span className="sr-only">{unit}</span>
        </h2>
      </div>
    </div>
  );
}

export default WeatherInfo;
