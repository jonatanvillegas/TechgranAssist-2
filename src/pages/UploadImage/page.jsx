import React, { useState, useEffect } from 'react';
import Layout from '@/pages/Layout/page';
import { Upload } from 'lucide-react';
import * as tmImage from '@teachablemachine/image'; 
import { useNavigate } from 'react-router-dom'; 
import Modal from 'react-modal'; 
import { ClipLoader } from 'react-spinners'; 
import ChatbotWindow from '../components/Bot';

Modal.setAppElement('#root'); 

const Page = () => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const modelURL = '/model/model.json';
  const metadataURL = '/model/metadata.json';


  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };

    loadModel();
  }, []);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageURL = e.target.result;
        setImage(imageURL); 
        await analyzeImage(imageURL); 
      };
      reader.readAsDataURL(file);
    }
  };


  const analyzeImage = async (imageURL) => {
    if (!model) {
      console.error('El modelo aún no se ha cargado.');
      return;
    }

    const imgElement = new Image();
    imgElement.src = imageURL;

    imgElement.onload = async () => {
      setLoading(true); 
      setTimeout(async () => {
        const prediction = await model.predict(imgElement);
        const result = prediction
          .map((pred) => `${pred.className}: ${(pred.probability * 100).toFixed(2)}%`)
          .join(', ');
        setAnalysis(result);
        setLoading(false); 

       
        navigate('/resultado', { state: { image: imageURL, analysis: result } });
      }, 8000);
    };
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-medium">Sube una imagen para analizar</h2>
        <div className="mb-6">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-500 rounded-lg border-2 border-dashed cursor-pointer hover:bg-gray-100"
          >
            <Upload className="text-green-medium" size={48} />
            <span className="mt-2 text-base">Haz clic para subir o arrastra una imagen aquí</span>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>
        </div>
        {image && (
          <div className="mb-6">
            <img src={image} alt="Imagen subida" className="max-w-full h-auto rounded-lg" />
          </div>
        )}
      </div>

      {/* Modal de carga */}
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
          <span className="mt-4 text-lg">Analizando la imagen, por favor espera...</span>
        </div>
      </Modal>

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
    </Layout>
  );
};

export default Page;
