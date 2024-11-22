import React from 'react';
import { MapPin } from 'lucide-react';

const MapMarker = ({ label, color = '#3B82F6' }) => {
  return (
    <div className="relative inline-block">
      <MapPin
        size={40}
        color={color}
        className="filter drop-shadow-md"
      />
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full">
        <div className="bg-white text-gray-800 px-2 py-1 rounded-full text-sm font-semibold whitespace-nowrap filter drop-shadow">
          {label}
        </div>
        <div 
          className="w-2 h-2 bg-white rotate-45 absolute left-1/2 -bottom-1 -translate-x-1/2"
          style={{ boxShadow: '1px 1px 1px rgba(0,0,0,0.1)' }}
        ></div>
      </div>
    </div>
  );
};

export default MapMarker;

