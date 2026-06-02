<template>
  <main>
    <Header />

    <Error v-if="isError" @onRetry="tryReload" />

    <template v-else>
      <Title />
      <Search @onSearchResult="onSearchResult" />

      <Loading v-if="isLoading" />
      <Forecast v-else-if="forecast" :forecast="forecast" :city="city" />
    </template>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Cookie from "js-cookie";
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
import Title from "@/components/Title.vue";
import Forecast from "@/components/forecast/Index.vue";
import Error from "@/components/Error.vue";
import api from "@/services/api";
import type { ForecastResponse, LocationSearchResult } from "@/services/types";
import Loading from "@/components/Loading.vue";

const DEFAULT_COORDS = {
  latitude: "55.75204",
  longitude: "37.61781",
};

const DEFAULT_CITY = Cookie.get("city") || "Moscow";

const forecast = ref<ForecastResponse | null>(null);
const city = ref<string>(DEFAULT_CITY);
const isLoading = ref(false);
const isError = ref(false);

const persistCoords = (latitude: string, longitude: string) => {
  Cookie.set("latitude", latitude);
  Cookie.set("longitude", longitude);
};

const updateWeather = async (
  coords: { latitude: string; longitude: string },
  fallbackCity = ""
) => {
  isLoading.value = true;
  isError.value = false;

  try {
    if (fallbackCity) {
      forecast.value = await api.getForecast(coords);
      city.value = fallbackCity;
    } else {
      const [forecastResult, cityResult] = await Promise.allSettled([
        api.getForecast(coords),
        api.getCityName(coords),
      ]);

      if (forecastResult.status === "rejected") {
        throw forecastResult.reason;
      }

      forecast.value = forecastResult.value;

      city.value =
        cityResult.status === "fulfilled" && cityResult.value
          ? cityResult.value
          : fallbackCity;
    }
  } catch {
    forecast.value = null;
    city.value = fallbackCity || DEFAULT_CITY;
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const loadForecast = async () => {
  const coords = {
    latitude: DEFAULT_COORDS.latitude,
    longitude: DEFAULT_COORDS.longitude,
  };

  function setCoords(lt: string, lg: string) {
    coords.latitude = lt;
    coords.longitude = lg;
  }

  const getCurrentLocation = async (): Promise<{
    latitude: string;
    longitude: string;
  } | null> => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return null;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        () => {
          resolve(null);
        }
      );
    });
  };

  const cookieLt = Cookie.get("latitude");
  const cookieLg = Cookie.get("longitude");

  if (cookieLt && cookieLg) {
    setCoords(cookieLt, cookieLg);
  } else {
    const currentLocation = await getCurrentLocation();

    if (currentLocation) {
      persistCoords(currentLocation.latitude, currentLocation.longitude);
      setCoords(currentLocation.latitude, currentLocation.longitude);
    }
  }

  const cityName = Cookie.get("city") || "";

  await updateWeather(coords, cityName);
};

const tryReload = async () => {
  await loadForecast();
};

const onSearchResult = async (location: LocationSearchResult) => {
  const coords = {
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
  };
  const fallbackCity = location.name || DEFAULT_CITY;
  Cookie.set("city", location.name);

  persistCoords(coords.latitude, coords.longitude);
  await updateWeather(coords, fallbackCity);
};

onMounted(async () => {
  await loadForecast();
});
</script>

<style lang="scss" scoped>
main {
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
