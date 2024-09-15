import React, { useState } from 'react'
import Layout from '@/pages/Layout/page'
import { Menu, Upload, Clock, Settings } from 'lucide-react';

const page = () => {

    const [image, setImage] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [currentView, setCurrentView] = useState('upload');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                // Simular análisis de IA (reemplazar con llamada real a la API)
                setTimeout(() => {
                    const result = "Este es un análisis de muestra de la imagen subida. En una implementación real, aquí se mostraría el resultado del análisis de IA basado en el contenido de la imagen.";
                    setAnalysis(result);
                    // Agregar al historial
                    const newHistoryItem = {
                        id: history.length + 1,
                        image: e.target.result,
                        date: new Date().toISOString().split('T')[0],
                        result: result.substring(0, 100) + '...' // Resumen breve
                    };
                    setHistory([newHistoryItem, ...history]);
                }, 2000);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Layout>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center text-green-medium">Sube una imagen para analizar</h2>
                <div className="mb-6">
                    <label htmlFor="image-upload" className="flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-500 rounded-lg border-2 border-dashed cursor-pointer hover:bg-gray-100">
                        <Upload className='text-green-medium' size={48} />
                        <span className="mt-2 text-base">Haz clic para subir o arrastra una imagen aquí</span>
                        <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </label>
                </div>
                {image && (
                    <div className="mb-6">
                        <img src={image} alt="Imagen subida" className="max-w-full h-auto rounded-lg" />
                    </div>
                )}
                {analysis && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2 text-blue-800">Análisis de la imagen:</h3>
                        <p className="text-blue-700">{analysis}</p>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default page
