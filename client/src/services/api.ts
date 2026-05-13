import request from "./httpClient";

export type ForecastQuery = {
  latitude: number | string;
  longitude: number | string;
};

export type Current = {
  time: string;
  interval: number;
  temperature_2m?: number;
  apparent_temperature?: number;
  relative_humidity_2m?: number;
  precipitation?: number;
  wind_speed_10m?: number;
  weather_code?: number;
};
export type CurrentUnits = {
  time: string;
  interval: string;
  temperature_2m?: string;
  apparent_temperature?: string;
  relative_humidity_2m?: string;
  precipitation?: string;
  wind_speed_10m?: string;
  weather_code?: string;
};

export type ForecastResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: CurrentUnits;
  current?: Current;
};

export type LocationSearchResult = {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  timezone?: string;
};

export type LocationSearchResponse = {
  results?: LocationSearchResult[];
  generationtime_ms?: number;
};

export function getForecast(query: ForecastQuery) {
  return request<ForecastResponse>("/forecast", {
    query,
  });
}

export function searchLocations(location: string) {
  return request<LocationSearchResponse>("/search", {
    query: {
      location,
    },
  });
}

const api = {
  getForecast,
  searchLocations,
};

export default api;
