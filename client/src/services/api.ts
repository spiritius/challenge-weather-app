import request from "./httpClient";
import type {
  ForecastQuery,
  ForecastResponse,
  LocationSearchResponse,
} from "./types";

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

export function getCityName(coords: ForecastQuery) {
  return request<string>("/getCityName", {
    query: coords,
  });
}

const api = {
  getForecast,
  searchLocations,
  getCityName,
};

export default api;
