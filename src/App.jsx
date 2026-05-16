import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import RegisterPage from './pages/RegisterPage'
import { Toaster, toast } from 'sonner';
import Dashboard from './pages/Dashboard';
import CreateMeal from './components/CreateMeal';

function App() {
  return (

    <BrowserRouter>
    <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

