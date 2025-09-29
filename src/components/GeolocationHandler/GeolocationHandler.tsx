"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { reverseGeocode } from "@/utils/utils";

function GeolocationHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    const hasCoordinates = searchParams.get("lat") && searchParams.get("long");
    if (hasCoordinates) return;

    if (startedRef.current) return;

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    const paramsLoading = new URLSearchParams(searchParams.toString());
    paramsLoading.set("loading", "location");
    router.replace(`/?${paramsLoading.toString()}`, { scroll: false });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const placeName = await reverseGeocode(lat, lng);

          const params = new URLSearchParams(searchParams.toString());
          params.delete("loading");
          params.set("lat", lat.toString());
          params.set("long", lng.toString());
          params.set("place", placeName);

          router.replace(`/?${params.toString()}`);
        } catch (error) {
          console.error("Error:", error);

          // Fallback: just set coordinates
          const params = new URLSearchParams(searchParams.toString());
          params.delete("loading");
          params.set("lat", lat.toString());
          params.set("long", lng.toString());
          params.set("place", "Current Location");

          router.replace(`/?${params.toString()}`);
        }
      },
      (error) => {
        console.log("Location denied or failed:", error.message);

        const params = new URLSearchParams(searchParams.toString());
        params.delete("loading");
        router.replace(`/?${params.toString()}`, { scroll: false });
      },

      {
        enableHighAccuracy: false, // Faster response
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, [searchParams, router]);

  return null;
}

export default GeolocationHandler;
