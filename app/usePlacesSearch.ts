import { useState, useEffect } from "react";

export const usePlacesSearch = (query: string, center: { lat: number; lng: number }) => {
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    const service = new google.maps.places.PlacesService(document.createElement("div"));
    const request = { query, location: center, radius: 50000 };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results || []);
      }
    });
  }, [query, center]);

  return { places, loadPlaces: () => {} };
};
