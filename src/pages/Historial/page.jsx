import React, { useState } from 'react'
import Layout from '@/pages/Layout/page'

const page = () => {
    // Datos de ejemplo para el historial
    const initialHistory = [
    { id: 1, image: '/placeholder.svg?height=200&width=300', date: '2023-05-15', result: 'Imagen de un paisaje montañoso con un lago.' },
    { id: 2, image: '/placeholder.svg?height=200&width=300', date: '2023-05-14', result: 'Retrato de una persona sonriendo.' },
    { id: 3, image: '/placeholder.svg?height=200&width=300', date: '2023-05-13', result: 'Escena urbana con rascacielos.' },
  ];

  const [history, setHistory] = useState(initialHistory);
  return (
    <Layout>
        <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Historial de Análisis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={item.image} alt={`Análisis ${item.id}`} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-2">Fecha: {item.date}</p>
                      <p className="text-sm text-gray-700">{item.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    </Layout>
  )
}

export default page
