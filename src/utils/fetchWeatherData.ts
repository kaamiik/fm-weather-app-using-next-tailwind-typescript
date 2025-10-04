import type { WeatherData } from '@/types/types';

export async function fetchWeatherData(
  lat: string,
  lng: string,
  tempUnit: string = 'metric',
  windUnit: string = 'metric',
  precipUnit: string = 'metric'
): Promise<WeatherData | string> {
  const tempUnitParam = tempUnit === 'imperial' ? 'fahrenheit' : 'celsius';
  const windUnitParam = windUnit === 'imperial' ? 'mph' : 'kmh';
  const precipUnitParam = precipUnit === 'imperial' ? 'inch' : 'mm';

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,temperature_80m&daily=temperature_2m_min,temperature_2m_max,weather_code,sunrise,sunset,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,wind_speed_10m_max,uv_index_max&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m,precipitation,visibility&timezone=auto&temperature_unit=${tempUnitParam}&wind_speed_unit=${windUnitParam}&precipitation_unit=${precipUnitParam}&forecast_days=7`;

  const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=european_aqi&timezone=auto`;

  const [weatherResponse, airQualityResponse] = await Promise.all([
    fetch(weatherUrl, { next: { revalidate: 600 } }),
    fetch(airQualityUrl, { next: { revalidate: 600 } }),
  ]);

  if (!weatherResponse.ok) {
    return `Weather API error: ${weatherResponse.status} ${weatherResponse.statusText}`;
  }

  if (!airQualityResponse.ok) {
    return `Weather API error: ${airQualityResponse.status} ${airQualityResponse.statusText}`;
  }

  const weatherData = await weatherResponse.json();

  let airQualityData = null;
  if (airQualityResponse.ok) {
    airQualityData = await airQualityResponse.json();
  }

  return {
    ...weatherData,
    current: {
      ...weatherData.current,
      european_aqi: airQualityData?.current?.european_aqi ?? null,
    },
  };
}
