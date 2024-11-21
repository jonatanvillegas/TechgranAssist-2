import { RefreshCw, Save } from 'lucide-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChatbotWindow from '../components/Bot';
import { chatSession } from '@/IA/model';
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage';
import { storage,db } from '@/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import Modal from 'react-modal';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
const Page = () => {
    const [additionalInfo, setAdditionalInfo] = useState('');
    const location = useLocation();
    const [cultivos, setCultivos] = useState();
    const { image, analysis } = location.state || {}; // Obtener la imagen y el análisis del estado
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const base64ToFile = (base64, filename) => {
        const byteString = atob(base64.split(',')[1]); 
        const mimeType = base64.match(/data:(.*?);base64/)[1]; 
      
        const byteArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i);
        }
      
        return new File([byteArray], filename, { type: mimeType });
      };

    const handleSave = async () => {
        if (image && analysis && additionalInfo) {
            try {
                setLoading(true)
                console.log(image)
                const file = base64ToFile(image, 'uploaded-image.jpg'); 

                const imageRef = ref(storage, `Suelos/${Date.now()}`);
          
                await uploadBytes(imageRef, file);
          
                const url = await getDownloadURL(imageRef);

                //creacion de documento del analisis
                const docRef = await addDoc(collection(db, "analisis"), {
                    imageUrl: url,
                    analysis: analysis,
                    informacion:additionalInfo,
                    cultivos:cultivos,
                    fecha_creacion: new Date(), 
                  });
                setImageUrl(url)
                console.log("Documento creado con ID: ", docRef.id);
                setLoading(false)
                navigate("/analisis")
              } catch (error) {
                console.error("Error al subir la imagen", error);
              } 
        } else {
            console.error('No hay datos para guardar');
        }
    };

    const generateInfo = async () => {

        const respuesta = await chatSession.sendMessage(analysis)
        const text = JSON.parse(respuesta.response.text())
        console.log(text.descripcion)

        setCultivos(text.cultivos_recomendados)
        setAdditionalInfo(text.descripcion);
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-2">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-green-800">Información adicional:</h3>
                    <button
                        onClick={generateInfo}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200 flex items-center"
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Generar información
                    </button>
                </div>
                <p className="text-green-700">{additionalInfo || "Haga clic en 'Generar información' para obtener más detalles."}</p>
                <div className="flex flex-row gap-2 mt-2 items-center">
                    {cultivos?.map((cultivo, index) => (
                        <div key={index} className="bg-slate-200 p-3 shadow-lg rounded-md">
                            <p className="font-bold text-md">{cultivo}</p>
                        </div>
                    ))}
                </div>
            </div>
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
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                }}
            >
                <ChatbotWindow />
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
                    },
                }}
            >
                <div className="flex flex-col items-center justify-center">
                    <ClipLoader color="#4CAF50" size={60} />
                    <span className="mt-4 text-lg">Guardando el analisis...</span>
                </div>
            </Modal>
        </div>
    );
};

export default Page;
