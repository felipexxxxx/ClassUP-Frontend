import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/aluno" element={<div>Área do aluno</div>} />
        <Route path="/professor" element={<div>Área do professor</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
