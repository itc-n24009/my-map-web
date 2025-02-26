import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import styles from "@/app/global.module.css";

interface MapProps {
  selectedPlace: any;
}

const Map: React.FC<MapProps> = ({ selectedPlace }) => {
  return (
    <GoogleMap
      mapContainerClassName={styles.mapContainer}
      center={selectedPlace.geometry.location}
      zoom={17}
    >
      <Marker
        position={selectedPlace.geometry.location}
        title={selectedPlace.name}
      />
    </GoogleMap>
  );
};

export default Map;
