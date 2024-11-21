import React from 'react'
import { FaChartLine, FaCogs, FaChartPie } from 'react-icons/fa' // Usando react-icons para agregar iconos

const HowItWorks = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
                    Cómo Funciona
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                        <div className="flex justify-center mb-6">
                            <FaChartLine className="text-4xl text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-4">1. Análisis</h3>
                        <p className="text-gray-600 text-center">
                            Analizamos el flujo de usuarios en tu plataforma para identificar áreas de mejora.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                        <div className="flex justify-center mb-6">
                            <FaCogs className="text-4xl text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-4">2. Optimización</h3>
                        <p className="text-gray-600 text-center">
                            Implementamos cambios estratégicos para mejorar la experiencia del usuario.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                        <div className="flex justify-center mb-6">
                            <FaChartPie className="text-4xl text-red-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-4">3. Resultados</h3>
                        <p className="text-gray-600 text-center">
                            Medimos el impacto de los cambios y ajustamos para maximizar las conversiones.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
