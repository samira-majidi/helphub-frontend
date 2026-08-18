// components/map/MapPicker.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// حل مشکل آیکون پیش‌فرض بدون استفاده از any
type DefaultIconPrototype = L.Icon.Default & { _getIconUrl?: string };
delete (L.Icon.Default.prototype as DefaultIconPrototype)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export interface LocationCoords {
  lat: number;
  lng: number;
}

interface MapPickerProps {
  onLocationSelect: (location: LocationCoords) => void;
  defaultLocation?: LocationCoords;
}

interface LocationMarkerProps {
  position: LocationCoords | null;
  setPosition: React.Dispatch<React.SetStateAction<LocationCoords | null>>;
  onLocationSelect: (location: LocationCoords) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ position, setPosition, onLocationSelect }) => {
  const markerRef = useRef<L.Marker>(null);

  // هندل کردن کلیک روی نقشه
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      onLocationSelect({ lat, lng });
    },
  });

  // هندل کردن پایان درگ مارکر
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setPosition({ lat, lng });
          onLocationSelect({ lat, lng });
        }
      },
    }),
    [onLocationSelect, setPosition]
  );

  return position === null ? null : (
    <Marker 
      draggable={true} 
      eventHandlers={eventHandlers} 
      position={position} 
      ref={markerRef} 
    />
  );
};

const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect, defaultLocation }) => {
  const [isLocating, setIsLocating] = useState(!defaultLocation); 
  const [position, setPosition] = useState<LocationCoords | null>(defaultLocation || null);
  const defaultCenter: LocationCoords = defaultLocation || { lat: 35.6997, lng: 51.3380 };
  
  // رفرنس به خود نقشه برای کنترل انیمیشن‌ها
  const mapRef = useRef<L.Map>(null);

  // تابع پرواز نرم به موقعیت جدید
  const flyToLocation = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], 15, {
        animate: true,
        duration: 1.5, // مدت زمان انیمیشن پرواز
      });
    }
  };

  // تابع دریافت لوکیشن کاربر (برای دکمه)
  const locateUser = useCallback(() => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setPosition(newPos);
          onLocationSelect(newPos);
          flyToLocation(newPos.lat, newPos.lng); // پرواز به لوکیشن بعد از پیدا شدن
          setIsLocating(false);
        },
        (err) => {
          console.warn("خطا در دریافت موقعیت:", err.message);
          setIsLocating(false);
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: Infinity }
      );
    } else {
      setIsLocating(false);
    }
  }, [onLocationSelect]);

  // دریافت لوکیشن در لحظه باز شدن نقشه
  useEffect(() => {
    if (!defaultLocation) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setPosition(newPos);
            onLocationSelect(newPos);
            flyToLocation(newPos.lat, newPos.lng); // پرواز اولیه به لوکیشن
            setIsLocating(false);
          },
          (err) => {
            console.warn("خطا در دریافت موقعیت:", err.message);
            setIsLocating(false);
          },
          // آپدیت شدن تنظیمات برای جلوگیری از خطای Timeout
          { enableHighAccuracy: false, timeout: 15000, maximumAge: Infinity }
        );
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLocating(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // سینک کردن position در صورت تغییر defaultLocation از بیرون
  useEffect(() => {
    if (defaultLocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosition(defaultLocation);
    }
  }, [defaultLocation?.lat, defaultLocation?.lng]); 

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-200 z-0 relative">
      <MapContainer 
        ref={mapRef} // اتصال رفرنس به کانتینر نقشه
        center={[defaultCenter.lat, defaultCenter.lng]} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          position={position} 
          setPosition={setPosition} 
          onLocationSelect={onLocationSelect} 
        />
      </MapContainer>

      {/* دکمه مکان‌یابی */}
      <button
        type="button"
        onClick={locateUser}
        disabled={isLocating}
        className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed border border-gray-200"
        title="مکان من"
      >
        {isLocating ? "⏳" : "📍"}
      </button>

      {/* نمایش مختصات */}
      {position && (
        <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-lg z-[1000] text-sm font-medium backdrop-blur-sm">
          <span className="text-blue-600 font-mono">Lat: {position.lat.toFixed(6)}</span> <br />
          <span className="text-green-600 font-mono">Lng: {position.lng.toFixed(6)}</span>
        </div>
      )}
    </div>
  );
};

export default MapPicker;
