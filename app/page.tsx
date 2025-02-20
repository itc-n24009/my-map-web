"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 35.65856,
  lng: 139.745461,
};

const MyComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!apiKey) {
    return <p>Error: Google Maps API key is missing.</p>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17} />
    </LoadScript>
  );
};

export default MyComponent;
