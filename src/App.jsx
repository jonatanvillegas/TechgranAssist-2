import LandingPage from '@/pages/LandingPage/page';
import Login from '@/pages/Login/page';
import SingUp from '@/pages/SingUp/page';
import Admin from '@/pages/Admin/page';
import UploadImage from '@/pages/UploadImage/page';
import Historial from '@/pages/Historial/page';
import Resultado from '@/pages/Resultado/page';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useFirebase } from './context/FirebaseContext';

function App() {
  const { currentUser } = useFirebase(); // Asegúrate de que se llama 'currentUser'

  const isAdmin = currentUser && currentUser?.role === 'Admin'; // Verifica si el usuario es admin
  const isAuthenticated = !!currentUser; // Verifica si el usuario está autenticado
console.log(currentUser?.role)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
          <Route 
            path="/admin" 
            element={isAdmin ? <Admin /> : <Navigate to="/" />} // Redirige si no es admin
          />
          <Route 
            path="/analisis" 
            element={isAuthenticated ? <UploadImage /> : <Navigate to="/login" />} // Redirige si no está autenticado
          />
          <Route 
            path="/historial" 
            element={isAuthenticated ? <Historial /> : <Navigate to="/login" />} // Redirige si no está autenticado
          />
          <Route 
            path="/resultado" 
            element={isAuthenticated ? <Resultado /> : <Navigate to="/login" />} // Redirige si no está autenticado
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
