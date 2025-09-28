import WeatherInfo from "@/components/WeatherInfo";
import WeatherDetails from "@/components/WeatherDetails";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import { fetchWeatherData } from "@/utils/fetchWeatherData";
import type { WeatherData } from "@/types/weather";

type Props = {
  place?: string;
  lat: string;
  long: string;
  temp?: string;
  wind?: string;
  precip?: string;
  day?: string;
};

export default async function WeatherSection({
  place,
  lat,
  long,
  temp,
  wind,
  precip,
  day,
}: Props) {
  const weatherData: WeatherData = await fetchWeatherData(
    lat,
    long,
    temp || "metric",
    wind || "metric",
    precip || "metric"
  );

  if (
    !weatherData ||
    !weatherData.current ||
    !weatherData.daily ||
    !weatherData.hourly
  ) {
    return (
      <p className="text-center text-700 font-bold">No search result found!</p>
    );
  }

  if (weatherData.current.temperature_2m === undefined) {
    return (
      <p className="text-center text-700 font-bold">No search result found!</p>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[2fr_1fr] xl:grid-rows-[auto_auto] xl:gap-8">
      <div className="grid gap-5 xl:col-start-1 xl:row-start-1">
        <WeatherInfo
          place={place}
          current={weatherData.current}
          tempUnit={temp}
        />

        <WeatherDetails
          current={weatherData.current}
          tempUnit={temp}
          windUnit={wind}
          precipUnit={precip}
        />
      </div>

      <DailyForecast
        daily={weatherData.daily}
        tempUnit={temp}
        className="xl:col-start-1 xl:row-start-2 self-end"
      />

      <HourlyForecast
        hourly={weatherData.hourly}
        tempUnit={temp}
        selectedDay={day}
        className="xl:col-start-2 xl:row-span-full max-h-[43rem]"
      />
    </div>
  );
}
