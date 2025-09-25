import * as React from "react";
import DailyWeatherCard from "../DailyWeatherCard";
import { getDayNames } from "@/utils/utils";

type DailyForecastProps = {
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  tempUnit?: string;
  className?: string;
};

function DailyForecast({
  daily,
  tempUnit = "metric",
  className = "",
}: DailyForecastProps) {
  const dayNames = getDayNames(daily);
  return (
    <div className={className}>
      <h3 className="text-600 font-semibold">Daily forecast</h3>
      <ul className="mt-5 grid gap-4 grid-cols-(--my-grid-cols-daily)">
        {daily
          ? daily.time.map((_, index) => (
              <DailyWeatherCard
                key={daily.time[index]}
                day={dayNames[index]}
                weatherCode={daily.weather_code[index]}
                minTemp={Math.round(daily.temperature_2m_min[index])}
                maxTemp={Math.round(daily.temperature_2m_max[index])}
                tempUnit={tempUnit}
              />
            ))
          : dayNames.map((day) => (
              <DailyWeatherCard
                key={day}
                day={day}
                weatherCode={0}
                minTemp="--"
                maxTemp="--"
                tempUnit={tempUnit}
              />
            ))}
      </ul>
    </div>
  );
}

export default DailyForecast;
