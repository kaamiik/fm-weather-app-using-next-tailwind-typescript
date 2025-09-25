import { getWeatherIcon } from "@/utils/utils";
import Image from "next/image";
import * as React from "react";

function DailyWeatherCard({
  day,
  weatherCode,
  minTemp,
  maxTemp,
  tempUnit,
}: {
  day: string;
  weatherCode: number;
  minTemp: string | number;
  maxTemp: string | number;
  tempUnit: string;
}) {
  const weatherIcon =
    minTemp === "--" ? "unknown" : getWeatherIcon(weatherCode) || "sunny";
  const temp = tempUnit === "imperial" ? "FAHRENHEIT" : "CELSIUS";
  return (
    <li className="p-2.5 flex flex-col gap-4 bg-neutral-800 border border-neutral-600 rounded-12">
      <p className="text-500 text-center">{day}</p>
      <Image
        src={`/assets/images/icon-${weatherIcon}.webp`}
        alt={`Weather: ${weatherIcon}`}
        width={60}
        height={60}
        className="mx-auto"
      />
      <div className="flex items-center justify-between text-400 text-neutral-200">
        <p>
          {`${minTemp}${typeof minTemp === "number" ? "°" : ""}`}{" "}
          <span className="sr-only">{temp}</span>
        </p>
        <p>
          {`${maxTemp}${typeof maxTemp === "number" ? "°" : ""}`}{" "}
          <span className="sr-only">{temp}</span>
        </p>
      </div>
    </li>
  );
}

export default DailyWeatherCard;
