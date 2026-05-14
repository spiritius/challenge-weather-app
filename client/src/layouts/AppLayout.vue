<template>
  <main>
    <Header />

    <Error v-if="isError" @onRetry="tryReload" />

    <template v-else>
      <Title />
      <Search />

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
import api, { ForecastResponse } from "@/services/api";
import Loading from "@/components/Loading.vue";

const DEFAULT_COORDS = {
  latitude: "55.75204",
  longitude: "37.61781",
};

const DEFAULT_CITY = "Moscow";

const forecast = ref<ForecastResponse | null>(null);
const city = ref<string>(DEFAULT_CITY);
const isLoading = ref(false);
const isError = ref(false);

const loadForecast = async () => {
  isLoading.value = true;
  isError.value = false;
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
      Cookie.set("latitude", currentLocation.latitude);
      Cookie.set("longitude", currentLocation.longitude);

      setCoords(currentLocation.latitude, currentLocation.longitude);
    }
  }

  try {
    city.value = await api.getCityName(coords);
    forecast.value = await api.getForecast(coords);
  } catch {
    forecast.value = null;
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const tryReload = async () => {
  await loadForecast();
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
