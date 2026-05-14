import { Request, Response, NextFunction } from "express";
import { ResolveFnOutput } from "node:module";

const openMeteoUrl = process.env.OPEN_METEO_URL;
if (!openMeteoUrl) {
  throw new Error("OPEN_METEO_URL is not defined");
}

const currentData = process.env.METEO_CURRENT_DATA || "";
const dailyData = process.env.METEO_DAILY_DATA || "";
const hourlyData = process.env.METEO_HOURLY_DATA || "";

const geocodingUrl = process.env.GEOCODING_URL;
if (!geocodingUrl) {
  throw new Error("GEOCODING_URL is not defined");
}

const openStreetMapUrl = process.env.OPEN_SCTREET_MAP_URL || "";
if (!openStreetMapUrl) {
  throw new Error("OPEN_SCTREET_MAP_URL is not defined");
}

export const getForecast = (req: Request, res: Response) => {
  const coordinates = {
    latitude: req.query.latitude as string,
    longitude: req.query.longitude as string,
    current: currentData,
    daily: dailyData,
    hourly: hourlyData,
  };
  if (!coordinates.latitude || !coordinates.longitude) {
    throw new Error("Wrong URL query params");
  }

  const params = new URLSearchParams(coordinates);

  fetch(`${openMeteoUrl}?${params}`)
    .then((response) => response.json())
    .then((json) => res.json(json));
};

export const getLocationList = (req: Request, res: Response) => {
  const location = req.query.location as string;

  if (!location) {
    throw new Error("Wrong URL query params");
  }

  fetch(`${geocodingUrl}?name=${location}`)
    .then((response) => response.json())
    .then((json) => res.json(json));
};

export const getCityName = (req: Request, res: Response) => {
  const latitude = req.query.latitude as string;
  const longitude = req.query.longitude as string;

  if (!latitude || !longitude) {
    throw new Error("Wrong URL query params");
  }

  fetch(`${openStreetMapUrl}?lat=${latitude}&lon=${longitude}&format=json`, {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en",
      "User-Agent": "weather-app-main/1.0 (development contact: local-app)",
    },
  })
    .then((response) => response.json())
    .then((json) =>
      res.json(
        json.address?.city || json.address?.town || json.address?.village || ""
      )
    );
};
