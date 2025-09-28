"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { reverseGeocode } from "@/utils/utils";

function GeolocationHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasAskedForLocation, setHasAskedForLocation] = React.useState(false);

  React.useEffect(() => {
    const hasCoordinates = searchParams.get("lat") && searchParams.get("long");
    const hasAskedBefore = localStorage.getItem("location-permission-asked");

    if (hasCoordinates || hasAskedBefore || hasAskedForLocation) {
      return;
    }

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    setHasAskedForLocation(true);
    localStorage.setItem("location-permission-asked", "true");

    const params = new URLSearchParams(searchParams.toString());
    params.set("loading", "location");
    router.replace(`/?${params.toString()}`, { scroll: false });

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
  }, [searchParams, router, hasAskedForLocation]);

  return null;
}

export default GeolocationHandler;
