"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function OfficeLocation({
  latitude = 23.8041,
  longitude = 90.4125,
  zoom = 13,
}: {
  latitude?: number;
  longitude?: number;
  zoom?: number;
}) {
  useEffect(() => {
    // Fix for broken marker icon in Next.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="h-46 mx-auto w-[90%] overflow-hidden rounded-xl md:h-60 lg:h-100 lg:w-full lg:rounded-none">
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>TGS Advisor Head Office</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
