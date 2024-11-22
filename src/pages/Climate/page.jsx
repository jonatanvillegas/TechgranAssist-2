import React, { useState } from 'react';
import NicaraguaMapWithIndicator from '../components/NicaraguaMap';
import WeatherCard from '../components/Card';
import './barra.css';
import { Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const page = () => {
  const [ubicacion, setUbicacion] = useState({
    x: '',
    y: ' '
  })
  const weatherData = [
    {
      location: 'Matagalpa',
      temperature: 30,
      condition: 'sunny',
      feelsLike: 32,
      humidity: 60,
      windSpeed: 10,
      x: 144,
      y: 204
    },
    {
      location: 'Madriz',
      temperature: 28,
      condition: 'cloudy',
      feelsLike: 30,
      humidity: 65,
      windSpeed: 12,
      x: 97,
      y: 102
    },
    {
      location: 'RAAS',
      temperature: 29,
      condition: 'rainy',
      feelsLike: 31,
      humidity: 80,
      windSpeed: 15,
      x: 149,
      y: 241
    },
    {
      location: 'Estelí',
      temperature: 20,
      condition: 'snowy',
      feelsLike: 18,
      humidity: 70,
      windSpeed: 8,
      x: 117,
      y: 127
    },
    {
      location: 'Chontales',
      temperature: 22,
      condition: 'snowy',
      feelsLike: 19,
      humidity: 72,
      windSpeed: 7,
      x: 220,
      y: 225
    },
    {
      location: 'RAAN',
      temperature: 23,
      condition: 'cloudy',
      feelsLike: 24,
      humidity: 75,
      windSpeed: 10,
      x: 65,
      y: 310
    },
    {
      location: 'Jinotega',
      temperature: 21,
      condition: 'cloudy',
      feelsLike: 22,
      humidity: 74,
      windSpeed: 6,
      x: 84,
      y: 195
    },
    {
      location: 'Boaco',
      temperature: 27,
      condition: 'sunny',
      feelsLike: 28,
      humidity: 65,
      windSpeed: 9,
      x: 188,
      y: 202
    },
    {
      location: 'Rio San Juan',
      temperature: 24,
      condition: 'rainy',
      feelsLike: 26,
      humidity: 85,
      windSpeed: 12,
      x: 285,
      y: 266
    },
    {
      location: 'Rivas',
      temperature: 29,
      condition: 'sunny',
      feelsLike: 31,
      humidity: 55,
      windSpeed: 14,
      x: 261,
      y: 154
    },
    {
      location: 'Granada',
      temperature: 28,
      condition: 'cloudy',
      feelsLike: 29,
      humidity: 67,
      windSpeed: 11,
      x: 232,
      y: 153
    },
    {
      location: 'Masaya',
      temperature: 30,
      condition: 'sunny',
      feelsLike: 32,
      humidity: 60,
      windSpeed: 10,
      x: 218,
      y: 140
    },
    {
      location: 'Carazo',
      temperature: 26,
      condition: 'cloudy',
      feelsLike: 27,
      humidity: 70,
      windSpeed: 8,
      x: 239,
      y: 124
    },
    {
      location: 'Managua',
      temperature: 31,
      condition: 'sunny',
      feelsLike: 33,
      humidity: 58,
      windSpeed: 13,
      x: 218,
      y: 111
    },
    {
      location: 'Leon',
      temperature: 30,
      condition: 'sunny',
      feelsLike: 32,
      humidity: 59,
      windSpeed: 11,
      x: 171,
      y: 92
    },
    {
      location: 'Jinotega',
      temperature: 22,
      condition: 'cloudy',
      feelsLike: 23,
      humidity: 77,
      windSpeed: 6,
      x: 154,
      y: 43
    }
  ];

  const navigate = useNavigate()

  const identificar = (latitud, longitud) => {
    setUbicacion({ x: latitud, y: longitud });
  }
  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-gray-800 text-white py-2 text-center">
        <div className='w-10 h-10 p-2 ml-2 rounded-lg float-start bg-slate-100 cursor-pointer hover:bg-slate-400'>
          <Undo2 onClick={() => navigate("/analisis")} className="w-6 h-6 text-green-800 " />
        </div>
        <h2 className="text-3xl font-bold">Condiciones Climáticas</h2>
      </div>

      {/* Sección de tarjetas de clima con scroll horizontal */}
      <div className="w-full px-4 py-2 overflow-x-auto hidden-scrollbar">
        <div className="flex flex-row gap-4">
          {weatherData.map((data, index) => (
            <WeatherCard
              key={index}
              location={data.location}
              temperature={data.temperature}
              condition={data.condition}
              feelsLike={data.feelsLike}
              humidity={data.humidity}
              windSpeed={data.windSpeed}
              latitud={data.x}
              longitud={data.y}
              funcion={identificar}
            />
          ))}
        </div>
      </div>

      {/* Mapa de Nicaragua con indicador */}
      <NicaraguaMapWithIndicator ubicacion={ubicacion} />
    </div>
  );
};

export default page;
