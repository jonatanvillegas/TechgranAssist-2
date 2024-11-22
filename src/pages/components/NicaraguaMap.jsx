// src/components/NicaraguaMapWithIndicator.jsx
import React, { useState } from 'react';

const NicaraguaMapWithIndicator = ({ ubicacion }) => {
  const [indicatorPosition, setIndicatorPosition] = useState(null);

  // Función para manejar el clic sobre el mapa y colocar un indicador
  const handleMapClick = (e) => {
    const mapElement = e.target;
    const rect = mapElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIndicatorPosition({ x, y });
  };

  return (
    <div className="flex justify-center items-center h-96 flex-col ">
      <div className="relative left- cursor-pointer" onClick={handleMapClick}>
        <img
          src="/MapaNicaragua.png"
          alt="Mapa de Nicaragua"
          className="w-[400px] max-w-[600px] h-auto drop-shadow-black"
        />
        {ubicacion.x && ubicacion.y &&  (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-red-500"
            style={{
              left: `${ubicacion.x}px`,
              top: `${ubicacion.y}px`,
            }}
          >
            <span className="text-3xl">📍</span>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 text-xs rounded-md opacity-80">
              <p>
                Indicador en ({ubicacion.x.toFixed(0)}, {ubicacion.y.toFixed(0)})
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NicaraguaMapWithIndicator;
