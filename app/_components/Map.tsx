import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface MapProps {
  selectedPlace: any;
}

const containerStyle = {
  height: "100vh",
  width: "100%",
};

const Map: React.FC<MapProps> = ({ selectedPlace }) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
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