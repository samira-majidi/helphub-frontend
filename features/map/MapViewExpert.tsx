// components/map/ExpertsMapView.tsx
"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ----------------- تنظیمات آیکون‌های Leaflet -----------------
type DefaultIconPrototype = L.Icon.Default & { _getIconUrl?: string };
delete (L.Icon.Default.prototype as DefaultIconPrototype)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const userIcon = new L.DivIcon({
  className: "bg-transparent border-none",
  html: `<div class="relative flex h-5 w-5">
           <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
           <span class="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white shadow-md"></span>
         </div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export interface MapCoords {
  lat: number;
  lng: number;
}

export interface MapMarkerData {
  id: string | number;
  coords: MapCoords;
  title: string;
  subtitle?: string;
}

interface ExpertsMapViewProps {
  markers: MapMarkerData[];
  userLocation?: MapCoords | null;
  defaultCenter?: MapCoords;
}


const MapBoundsManager: React.FC<{ markers: MapMarkerData[]; userLocation?: MapCoords | null }> = ({
  markers,
  userLocation,
}) => {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([]);
    let hasPoints = false;

    if (userLocation) {
      bounds.extend([userLocation.lat, userLocation.lng]);
      hasPoints = true;
    }

    markers.forEach((marker) => {
      bounds.extend([marker.coords.lat, marker.coords.lng]);
      hasPoints = true;
    });

    if (hasPoints && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [map, markers, userLocation]);

  return null;
};

// کامپوننت اصلی نمایشی (Dumb)
export const ExpertsMapView: React.FC<ExpertsMapViewProps> = ({ 
  markers, 
  userLocation, 
  defaultCenter = { lat: 35.6997, lng: 51.3380 } 
}) => {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-200 z-0 relative">
      <MapContainer
        center={[defaultCenter.lat, defaultCenter.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapBoundsManager markers={markers} userLocation={userLocation} />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <span className="font-semibold text-sm">شما اینجا هستید</span>
            </Popup>
          </Marker>
        )}

        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.coords.lat, marker.coords.lng]}>
            <Popup>
              <div className="text-right flex flex-col gap-1 min-w-[120px]">
                <strong className="text-gray-800 text-sm">{marker.title}</strong>
                {marker.subtitle && (
                  <span className="text-gray-500 text-xs">{marker.subtitle}</span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
