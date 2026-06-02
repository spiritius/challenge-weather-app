import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

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

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, init);

    if (!response.ok) {
      const payload = await response.text();
      console.error("Upstream request failed", {
        url,
        status: response.status,
        statusText: response.statusText,
        payload,
      });

      throw new CustomError(
        502,
        "UPSTREAM_ERROR",
        `Upstream request failed with status ${response.status}`,
        {
          url,
          status: response.status,
          payload,
        }
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }

    console.error("Fetch request failed", {
      url,
      error,
      cause:
        error instanceof Error && "cause" in error ? error.cause : undefined,
    });

    throw new CustomError(
      502,
      "FETCH_FAILED",
      "Failed to fetch upstream data",
      {
        url,
        cause:
          error instanceof Error && "cause" in error ? error.cause : undefined,
      }
    );
  }
}

export const getForecast = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const coordinates = {
    latitude: req.query.latitude as string,
    longitude: req.query.longitude as string,
    current: currentData,
    daily: dailyData,
    hourly: hourlyData,
  };
  if (!coordinates.latitude || !coordinates.longitude) {
    return next(
      new CustomError(400, "INVALID_QUERY", "Wrong URL query params")
    );
  }

  const params = new URLSearchParams(coordinates);

  try {
    const json = await fetchJson(`${openMeteoUrl}?${params}`);
    res.json(json);
  } catch (error) {
    next(error);
  }
};

export const getLocationList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const location = req.query.location as string;

  if (!location) {
    return next(
      new CustomError(400, "INVALID_QUERY", "Wrong URL query params")
    );
  }

  try {
    const json = await fetchJson(`${geocodingUrl}?name=${location}`);
    res.json(json);
  } catch (error) {
    next(error);
  }
};

type ReverseGeocodingResponse = {
  address?: {
    county?: string;
    city?: string;
    town?: string;
    village?: string;
  };
};

export const getCityName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const latitude = req.query.latitude as string;
  const longitude = req.query.longitude as string;

  if (!latitude || !longitude) {
    return next(
      new CustomError(400, "INVALID_QUERY", "Wrong URL query params")
    );
  }

  try {
    const json = await fetchJson<ReverseGeocodingResponse>(
      `${openStreetMapUrl}?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          Accept: "application/json",
          "Accept-Language": "en",
          "User-Agent": "weather-app-main/1.0 (development contact: local-app)",
        },
      }
    );

    console.log("✳️ -> ", json.address);

    res.json(
      json.address?.county ||
        json.address?.city ||
        json.address?.town ||
        json.address?.village ||
        ""
    );
  } catch (error) {
    next(error);
  }
};
