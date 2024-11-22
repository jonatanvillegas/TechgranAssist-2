import React, { useEffect, useState } from 'react'
import Layout from '@/pages/Layout/page'
import { useFirebase } from '@/context/FirebaseContext';
import { CircleX, Trash2 } from 'lucide-react';
import Modal from 'react-modal';
import { ClipLoader } from 'react-spinners';
import { useAsyncError } from 'react-router-dom';
import Swal from 'sweetalert2';

const page = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [analisis, setAnalisis] = useState({})

  const { getHistorial ,deleteAnalisisById} = useFirebase();

  useEffect(() => {
    // Se suscribe a los cambios en la colección
    const unsubscribe = getHistorial(setHistory);

    // Limpia la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, [getHistorial]);

  const ActivarModal = (id) => {
    setLoading(true)
    const analisis = history.find((h) => h.id === id)
    setAnalisis(analisis)
    console.log(analisis.informacion)
  }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convertir el Timestamp a Date
    return date.toLocaleString(); // Formato legible de la fecha
  };

  const EliminarAnalisis = (id) => { 
    Swal.fire({
      title: "Estas seguro  ?",
      text: "Quieres eliminar el analisis de tu Historial",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2e9c60",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        deleteAnalisisById(id)
        Swal.fire({
          title: "Eliminado!",
          text: "Analisis eliminado correctamente.",
          icon: "success"
        });
      }
    });
   }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Historial de Análisis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.imageUrl} alt={`Análisis ${item.id}`} className="w-full h-48 object-cover cursor-pointer" onClick={() => ActivarModal(item.id)} />
              <div className="flex p-4 justify-between items-center">
                <div className='float-start'>
                  <p className="text-sm text-gray-500 mb-2">Fecha: <span className='font-bold text-green-700'>{formatDate(item.fecha_creacion)}</span></p>
                  <p className="text-sm text-gray-700">{item.result}</p>
                </div>
                <Trash2 className=' text-red-600' onClick={() => EliminarAnalisis(item.id)} />
              </div>
            </div>
          ))}
        </div>
        <Modal
          isOpen={loading}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '400px', // Tamaño fijo del modal (ajusta según sea necesario)
              height: '300px', // Tamaño fijo del modal (ajusta según sea necesario)
              overflow: 'auto',
            },
          }}
        >
          <div className="flex flex-col items-center justify-center">
          <CircleX className='text-green-700 absolute top-4 right-8 cursor-pointer' onClick={()=> setLoading(false)}/>
            <span className="mt-4 text-lg">{analisis.informacion}</span>
          </div>
        </Modal>
      </div>
    </Layout>
  )
}

export default page
