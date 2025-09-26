export type WeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    rain_sum: number[];
    showers_sum: number[];
    snowfall_sum: number[];
    precipitation_sum: number[];
    precipitation_hours: number[];
    wind_speed_10m_max: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    temperature_80m: number[];
  };
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
};
