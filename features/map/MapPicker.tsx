// components/map/MapPicker.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type DefaultIconPrototype = L.Icon.Default & { _getIconUrl?: string };
delete (L.Icon.Default.prototype as DefaultIconPrototype)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const customMarkerIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translate(-50%, -100%);">
      <svg width="46" height="54" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25));">
        <path d="M16 0C7.16344 0 0 7.16344 0 16C0 26.5 16 40 16 40C16 40 32 26.5 32 16C32 7.16344 24.8366 0 16 0Z" fill="#0F172A"/>
        <path d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z" fill="#FACC15"/>
        <path d="M16.5 9.5L11.5 16.5H16L15.5 22.5L20.5 15.5H16L16.5 9.5Z" fill="#0F172A"/>
      </svg>
      <div style="width: 14px; height: 6px; background: rgba(15, 23, 42, 0.4); border-radius: 50%; filter: blur(2px); margin-top: -2px;"></div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
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


  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      onLocationSelect({ lat, lng });
    },
  });


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
      icon={customMarkerIcon} 
    />
  );
};

const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect, defaultLocation }) => {
  const [isLocating, setIsLocating] = useState(!defaultLocation); 
  const [position, setPosition] = useState<LocationCoords | null>(defaultLocation || null);
  const defaultCenter: LocationCoords = defaultLocation || { lat: 35.6997, lng: 51.3380 };

  const mapRef = useRef<L.Map>(null);


  const flyToLocation = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], 15, {
        animate: true,
        duration: 1.5, 
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
          flyToLocation(newPos.lat, newPos.lng);
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
            flyToLocation(newPos.lat, newPos.lng);
            setIsLocating(false);
          },
          (err) => {
            console.warn("خطا در دریافت موقعیت:", err.message);
            setIsLocating(false);
          },
          
          { enableHighAccuracy: false, timeout: 15000, maximumAge: Infinity }
        );
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLocating(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  
  useEffect(() => {
    if (defaultLocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosition(defaultLocation);
    }
  }, [defaultLocation?.lat, defaultLocation?.lng]); 

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100 z-0 relative bg-[#f8f9fa]">
      <MapContainer 
        ref={mapRef}
        center={[defaultCenter.lat, defaultCenter.lng]} 
        zoom={13} 
        scrollWheelZoom={true} 
        zoomControl={false}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
     
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
        
        <ZoomControl position="bottomright" />

        <LocationMarker 
          position={position} 
          setPosition={setPosition} 
          onLocationSelect={onLocationSelect} 
        />
      </MapContainer>
      <button
        type="button"
        onClick={locateUser}
        disabled={isLocating}
        className="absolute bottom-24 right-[10px] z-[1000] bg-white w-[34px] h-[34px] rounded-[4px] shadow-[0_1px_5px_rgba(0,0,0,0.2)] hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed border-2 border-[rgba(0,0,0,0.2)] bg-clip-padding"
        title="مکان من"
      >
        {isLocating ? (
          <span className="w-4 h-4 border-2 border-brand-navy border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        )}
      </button>

      {position && (
        <div className="absolute top-4 left-4 bg-white/95 px-4 py-2.5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-[1000] text-xs font-semibold backdrop-blur-md border border-gray-100 flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0F172A]"></span>
            <span className="text-[#0F172A] font-mono">Lat: {position.lat.toFixed(5)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FACC15]"></span>
            <span className="text-[#0F172A] font-mono">Lng: {position.lng.toFixed(5)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPicker;
