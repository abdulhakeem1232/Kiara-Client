import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoutes from './Routes/User'
import ClientRoutes from './Routes/Client'
import AdminRoutes from './Routes/Admin'
import Login from './Pages/Users/LoginPage'
import { Toaster } from 'sonner';

function App() {
 

  return (
    <>
    <Router>
    <Routes>
     <Route path="/" element={<Login />} />
      <Route path='/*' element={<UserRoutes />} />
      <Route path='/client/*' element={<ClientRoutes />} />
      <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </Router>
    <Toaster position="top-center" richColors />
    </>
  )
}

export default App
