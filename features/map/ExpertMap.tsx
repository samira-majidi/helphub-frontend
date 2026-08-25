"use client";

import React from "react";
import { MapCoords, MapMarkerData, ExpertsMapView } from "./MapViewExpert";
import type { ExpertProfileData } from '@/entities/expert/types/experts.types';

interface ExpertsMapProps {
  experts: ExpertProfileData[];
  userLocation?: MapCoords | null; 
}

const getExpertCoords = (expert: ExpertProfileData): MapCoords | null => {
  if (
    !expert?.location || 
    expert.location.type !== "Point" || 
    !Array.isArray(expert.location.coordinates)
  ) {
    return null;
  }

  return {
    lng: expert.location.coordinates[0], 
    lat: expert.location.coordinates[1],
  };
};

// کامپوننت Container (Smart)
const ExpertsMapContainer: React.FC<ExpertsMapProps> = ({ experts, userLocation }) => {
  
  const mapMarkers: MapMarkerData[] = experts.reduce((acc, expert) => {
    const coords = getExpertCoords(expert);
    
    if (coords) {
      const firstName = expert.user?.firstName || expert.user?.name || '';
      const lastName = expert.user?.lastName || '';
      // تبدیل پیام فارسی به انگلیسی
      const expertName = expert.user 
        ? `${firstName} ${lastName}`.trim() 
        : 'Unknown Expert';
        
      const expertSpecialty = expert.category?.name || '';

      acc.push({
        id: String(expert.id),
        coords: coords,
        title: expertName,
        subtitle: expertSpecialty
      });
    }
    
    return acc;
  }, [] as MapMarkerData[]);

  return (
    <ExpertsMapView 
      markers={mapMarkers} 
      userLocation={userLocation} 
    />
  );
};

export default ExpertsMapContainer;
