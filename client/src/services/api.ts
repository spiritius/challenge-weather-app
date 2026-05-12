import request from "./httpClient";

export type ForecastQuery = {
  latitude: number | string;
  longitude: number | string;
};

export type ForecastResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: Record<string, string>;
  current?: Record<string, string | number | null>;
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
