// src/pages/DeliveryNavigationPage.jsx
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";

export default function DeliveryNavigationPage({ pickup, drop }) {
  // Coordinates (for example, fallback if not provided)
  const [pickupCoords, setPickupCoords] = useState({ lat: 19.076, lng: 72.8777 }); // Mumbai
  const [dropCoords, setDropCoords] = useState({ lat: 19.2183, lng: 72.9781 }); // Nearby location
  const [directions, setDirections] = useState(null);

  const mapContainerStyle = {
    height: "80vh",
    width: "100%",
  };

  const center = pickupCoords;

  useEffect(() => {
    // Optional: geocode pickup/drop addresses if strings are provided
    if (pickup && drop) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: pickup }, (results, status) => {
        if (status === "OK") setPickupCoords(results[0].geometry.location.toJSON());
      });
      geocoder.geocode({ address: drop }, (results, status) => {
        if (status === "OK") setDropCoords(results[0].geometry.location.toJSON());
      });
    }
  }, [pickup, drop]);

  useEffect(() => {
    if (pickupCoords && dropCoords) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickupCoords,
          destination: dropCoords,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") setDirections(result);
        }
      );
    }
  }, [pickupCoords, dropCoords]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
        {directions && <DirectionsRenderer directions={directions} />}
        <Marker position={pickupCoords} label="Pickup" />
        <Marker position={dropCoords} label="Drop" />
      </GoogleMap>
    </LoadScript>
  );
}
