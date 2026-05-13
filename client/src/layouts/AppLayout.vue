<template>
  <main>
    <Header />

    <template v-if="forecast">
      <Title />
      <Search />
      <Forecast :forecast="forecast" />
    </template>

    <Error v-else @onRetry="tryReload" />
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

const DEFAULT_COORDS = {
  latitude: "52.52",
  longitude: "13.419998",
};

const forecast = ref<ForecastResponse | null>(null);

const tryReload = () => {
  console.log("✳️ -> try reload");
};

onMounted(async () => {
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

  forecast.value = await api.getForecast(coords);
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
