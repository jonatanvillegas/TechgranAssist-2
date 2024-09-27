import LandingPage from '@/pages/LandingPage/page'
import Login from '@/pages/Login/page'
import SingUp from '@/pages/SingUp/page'
import Admin from '@/pages/Admin/page'
import UploadImage from '@/pages/UploadImage/page'
import Historial from '@/pages/Historial/page'
import Resultado from '@/pages/Resultado/page'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {


  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/analisis" element={<UploadImage />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
