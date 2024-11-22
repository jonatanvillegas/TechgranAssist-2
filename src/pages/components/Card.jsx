import React from 'react';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

const WeatherIcon = ({ condition }) => {
    switch (condition) {
        case 'sunny':
            return <Sun className="w-6 h-6 text-yellow-400" />;
        case 'cloudy':
            return <Cloud className="w-6 h-6 text-gray-400" />;
        case 'rainy':
            return <CloudRain className="w-6 h-6 text-blue-400" />;
        case 'snowy':
            return <Snowflake className="w-6 h-6 text-blue-200" />;
    }
};

const WeatherCard = ({
    temperature,
    condition,
    location,
    feelsLike,
    humidity,
    windSpeed,
    funcion,
    longitud,
    latitud
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-3 max-w-xs mx-auto cursor-pointer 
             hover:shadow-lg hover:-translate-y-2 transition-transform duration-300"
            onClick={()=>funcion(longitud,latitud)}
        >
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-800">{location}</h2>
                <WeatherIcon condition={condition} />
            </div>
            <div className="mb-3">
                <span className="text-xl font-bold text-gray-900">{temperature}°C</span>
                <span className="text-gray-500 ml-1 capitalize">{condition}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm">
                <div className="text-gray-600">
                    <p>Feels like: {feelsLike}°C</p>
                </div>
                <div className="text-gray-600">
                    <p>Humidity: {humidity}%</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;

