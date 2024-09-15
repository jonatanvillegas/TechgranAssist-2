import LandingPage from '@pages/LandingPage/page'
import Login from '@pages/Login/page'
import SingUp from '@pages/SingUp/page'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {


  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
