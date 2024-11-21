import React from 'react'

const AboutUs = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-50 via-white to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                        Quiénes Somos
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-12">
                        Somos un equipo apasionado dedicado a mejorar la experiencia del usuario y aumentar las conversiones. 
                        Nuestra misión es proporcionar herramientas innovadoras que ayuden a las empresas a entender y optimizar 
                        el flujo de usuarios en sus plataformas digitales.
                    </p>
                </div>

                <div className="flex justify-center mt-10">
                    <img 
                        src="https://via.placeholder.com/500" 
                        alt="Nuestro equipo" 
                        className="w-96 h-96 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="/contacto"
                        className="inline-block px-8 py-4 bg-green-medium text-white font-medium text-lg rounded-full shadow-lg hover:bg-green-light transition-colors duration-300"
                    >
                        Contáctanos
                    </a>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
