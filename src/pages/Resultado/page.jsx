import { Save } from 'lucide-react';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Page = () => {
    const location = useLocation();
    const { image, analysis } = location.state || {}; // Obtener la imagen y el análisis del estado

    // Función que manejará el clic del botón
    const handleSave = () => {
        if (image && analysis) {

        } else {
            console.error('No hay datos para guardar');
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-green-medium">Resultados del análisis</h2>
            {image && (
                <div className="mb-6">
                    <img src={image} alt="Imagen analizada" className="max-w-full h-auto rounded-lg" />
                </div>
            )}
            {analysis && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2 text-blue-800">Análisis de la imagen:</h3>
                    <p className="text-blue-700">{analysis}</p>
                </div>
            )}
            {/* Botón para guardar la información en Firebase */}
            <button
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
            >
                <div className='flex gap-2'>
                    <Save />
                    Guardar
                </div>
            </button>
        </div>
    );
};

export default Page;
