"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ----------------- تنظیمات آیکون‌های اختصاصی -----------------
// آیکون کاربر (پین سرمه‌ای رنگ)
const userIcon = new L.DivIcon({
  className: "bg-transparent border-none",
  html: `
    <div class="relative flex flex-col items-center">
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A1E3F] shadow-lg border-[3px] border-white z-10">
        <div class="w-3.5 h-3.5 bg-white rounded-full animate-pulse"></div>
      </div>
      <div class="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#0A1E3F] -mt-2 z-0"></div>
      <div class="mt-1 font-bold text-[#0A1E3F] text-[11px] uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded shadow-sm backdrop-blur-sm">
        Your Location
      </div>
    </div>
  `,
  iconSize: [60, 70],
  iconAnchor: [30, 45],
});

// آیکون متخصصین (پین زرد رنگ شیک و ساده بدون آیکون شغل)
const expertIcon = new L.DivIcon({
  className: "bg-transparent border-none",
  html: `
    <div class="relative flex flex-col items-center transition-transform hover:scale-110 duration-200">
      <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#FACC15] shadow-md border-[2px] border-white z-10">
         <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
      </div>
      <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#FACC15] -mt-[4px] z-0"></div>
    </div>
  `,
  iconSize: [40, 50],
  iconAnchor: [20, 40],
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

// کامپوننت اصلی نمایشی
export const ExpertsMapView: React.FC<ExpertsMapViewProps> = ({ 
  markers, 
  userLocation, 
  defaultCenter = { lat: 35.6997, lng: 51.3380 } 
}) => {
  return (
    <>
      {/* استایل‌های درون‌خطی برای نوت (Tooltip) سرمه‌ای */}
      <style>{`
        .navy-tooltip {
          background-color: #0A1E3F !important;
          border: none !important;
          color: white !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          border-radius: 8px !important;
          padding: 0 !important;
        }
        /* تغییر رنگ فلشِ زیر نوت به سرمه‌ای */
        .leaflet-tooltip-top.navy-tooltip::before {
          border-top-color: #0A1E3F !important;
        }
      `}</style>

      <div className="w-full h-[500px] lg:h-[calc(100vh-120px)] rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 z-0 relative font-sans">
        <MapContainer
          center={[defaultCenter.lat, defaultCenter.lng]}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false} // حذف زوم پیش‌فرض برای تغییر جایگاه
          style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
          
          {/* دکمه‌های زوم در پایین سمت راست */}
          <ZoomControl position="bottomright" />

          <MapBoundsManager markers={markers} userLocation={userLocation} />

          {/* مارکر کاربر */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Tooltip 
                direction="top" 
                offset={[0, -45]} 
                opacity={1} 
                className="navy-tooltip"
              >
                <div className="px-3 py-2 text-center min-w-[100px]">
                  <strong className="text-white text-sm font-medium tracking-wide">You are here</strong>
                </div>
              </Tooltip>
            </Marker>
          )}

          {/* مارکر متخصصین */}
          {markers.map((marker) => (
            <Marker key={marker.id} position={[marker.coords.lat, marker.coords.lng]} icon={expertIcon}>
              {/* نوت سرمه‌ای که با هاور کردن باز می‌شود */}
              <Tooltip 
                direction="top" 
                offset={[0, -35]} 
                opacity={1} 
                className="navy-tooltip"
              >
                <div className="flex flex-col gap-0.5 px-4 py-2.5 text-center min-w-[120px]">
                  <strong className="text-white text-[14px] font-bold">{marker.title}</strong>
                  {marker.subtitle && (
                    <span className="text-gray-300 text-[12px] font-medium">{marker.subtitle}</span>
                  )}
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};
