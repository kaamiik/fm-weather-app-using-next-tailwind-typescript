import type { NominatimResponse, LocationData } from '@/types/types';

export function correctLocationData(location: LocationData) {
  let country = location.country;

  if (!country && location.country_code) {
    if (location.country_code === 'PS') {
      country = 'Palestine';
    } else {
      country = location.country_code;
    }
  }

  if (
    location.admin1 === 'undefined' ||
    location.admin1 === 'null' ||
    !location.admin1
  ) {
    location = { ...location, admin1: undefined };
  }

  return { ...location, country };
}

// For visible dropdown (full info)
export function formatLocationDisplay(location: LocationData) {
  const corrected = correctLocationData(location);
  const country =
    corrected.country || corrected.country_code || 'Unknown Region';

  const parts = [corrected.name];
  if (corrected.admin1 && corrected.admin1 !== corrected.name) {
    parts.push(corrected.admin1);
  }
  if (corrected.admin2 && corrected.admin2 !== corrected.admin1) {
    parts.push(corrected.admin2);
  }
  if (corrected.admin3 && corrected.admin3 !== corrected.admin2) {
    parts.push(corrected.admin3);
  }
  parts.push(country);

  return parts.join(', ');
}

// For input value when selected (shorter: name, country)
export function formatLocationForSearch(location: LocationData): string {
  const corrected = correctLocationData(location);
  const name = corrected.name || 'Unknown Location';
  const country =
    corrected.country || corrected.country_code || 'Unknown Region';

  return `${name}, ${country}`;
}

// URL-friendly
export function formatLocationForURL(location: LocationData): string {
  const corrected = correctLocationData(location);
  const parts = [corrected.name];
  if (corrected.admin1 && corrected.admin1 !== corrected.name) {
    parts.push(corrected.admin1);
  }
  parts.push(corrected.country || corrected.country_code || 'Unknown Region');

  return parts.join(', ');
}

// Reverse Geocoding
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }
    const data: NominatimResponse = await response.json();
    return formatPlaceFromNominatim(data);
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return 'Current Location';
  }
}

// Format place name: Nominatim
export function formatPlaceFromNominatim(data: NominatimResponse) {
  const { address } = data;
  const parts: string[] = [];

  if (address.city) {
    parts.push(address.city);
  } else if (address.town) {
    parts.push(address.town);
  }

  if (address.state) {
    parts.push(address.state);
  }

  if (address.country) {
    parts.push(address.country);
  }

  return parts.length > 0 ? parts.join(', ') : 'Current Location';
}

// Flag from country_code
export function getFlagUrl(
  flagCode?: string,
  size: 'small' | 'medium' | 'large' = 'medium'
): string | null {
  if (!flagCode) return null;

  const sizes = { small: '20', medium: '40', large: '80' };
  return `https://flagcdn.com/w${sizes[size]}/${flagCode.toLowerCase()}.png`;
}

export function getWeatherIcon(weatherCode: number): string {
  if (weatherCode === 0) return 'sunny';
  if (weatherCode >= 1 && weatherCode <= 2) return 'partly-cloudy';
  if (weatherCode === 3) return 'overcast';
  if (weatherCode >= 45 && weatherCode <= 48) return 'fog';
  if (weatherCode >= 51 && weatherCode <= 57) return 'drizzle';
  if (weatherCode >= 61 && weatherCode <= 67) return 'rain';
  if (weatherCode >= 71 && weatherCode <= 77) return 'snow';
  if (weatherCode >= 80 && weatherCode <= 82) return 'rain';
  if (weatherCode >= 85 && weatherCode <= 86) return 'snow';
  if (weatherCode >= 95 && weatherCode <= 99) return 'storm';

  return 'partly-cloudy';
}

export function getTemperatureUnit(tempUnit?: string): string {
  return tempUnit === 'imperial' ? 'FAHRENHEIT' : 'CELSIUS';
}

// Only name + country
export function cleanPlaceName(place: string | undefined): string {
  if (!place) return 'Select a location';

  const cleaned =
    decodeURIComponent(place)
      .replace(/,\s*undefined/gi, '')
      .replace(/undefined,?\s*/gi, '')
      .replace(/,\s*,/g, ',')
      .replace(/^,\s*|,\s*$/g, '')
      .trim() || 'Selected Location';

  const parts = cleaned.split(',');
  if (parts.length >= 3) {
    const name = parts[0].trim();
    const middle = parts[1].trim();
    const country = parts[parts.length - 1].trim();
    return `${name}, ${middle}, ${country}`;
  }

  return cleaned;
}

export function getDayNames(daily?: {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}) {
  if (!daily) return [];

  return daily.time.map((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });
}

type Houly = {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
};

export function getCurrentDay(hourly?: Houly) {
  if (!hourly?.time?.[0]) return;

  const firstDate = new Date(hourly.time[0]);
  return firstDate.toLocaleDateString('en-Us', { weekday: 'long' });
}

export function getAvailableDays(hourly?: Houly) {
  if (!hourly?.time) return [];

  const uniqueDays = new Set<string>();

  hourly.time.forEach((timeStr) => {
    const date = new Date(timeStr);
    const dayName = date.toLocaleDateString('en-Us', { weekday: 'long' });
    uniqueDays.add(dayName);
  });

  return Array.from(uniqueDays);
}

export function formatHour(timeStr: string) {
  const date = new Date(timeStr);
  return date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    })
    .replace(' ', '');
}

export function getHoursForDay(
  day: string | undefined,
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  }
) {
  if (!hourly?.time || !hourly.temperature_2m || !hourly.weather_code) {
    return [];
  }

  return hourly.time
    .map((timeStr, index) => {
      const date = new Date(timeStr);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      return { timeStr, dayName, index };
    })
    .filter(({ dayName }) => dayName === day)
    .map(({ timeStr, index }) => ({
      time: formatHour(timeStr),
      temperature: Math.round(hourly.temperature_2m[index]),
      weatherCode: hourly.weather_code[index],
    }));
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

export function getAQICategory(aqi: number): string {
  if (aqi <= 20) return 'Good';
  if (aqi <= 40) return 'Fair';
  if (aqi <= 60) return 'Mod';
  if (aqi <= 80) return 'Poor';
  if (aqi <= 100) return 'Bad';
  return 'Severe';
}

export function getUVCategory(uvIndex: number): string {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Mod';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Intense';
  return 'Extreme';
}
