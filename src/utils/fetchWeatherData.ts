import type { WeatherData } from "@/types/weather";

export async function fetchWeatherData(
  lat: string,
  lng: string,
  tempUnit: string = "metric",
  windUnit: string = "metric",
  precipUnit: string = "metric"
): Promise<WeatherData | string> {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const tempUnitParam = tempUnit === "imperial" ? "fahrenheit" : "celsius";
  const windUnitParam = windUnit === "imperial" ? "mph" : "kmh";
  const precipUnitParam = precipUnit === "imperial" ? "inch" : "mm";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,temperature_80m&daily=temperature_2m_min,temperature_2m_max,weather_code,sunrise,sunset,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,wind_speed_10m_max&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m,precipitation&timezone=auto&temperature_unit=${tempUnitParam}&wind_speed_unit=${windUnitParam}&precipitation_unit=${precipUnitParam}&forecast_days=7`;

  const response = await fetch(url, { next: { revalidate: 600 } });

  if (!response.ok) {
    return `Weather API error: ${response.status} ${response.statusText}`;
  }

  return response.json();
}
