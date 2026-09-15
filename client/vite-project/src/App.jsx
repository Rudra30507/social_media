
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
