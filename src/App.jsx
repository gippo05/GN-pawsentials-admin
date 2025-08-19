import { useState } from 'react'
import './App.css'
import AdminPage from './pages/AdminPage'
import { BrowserRouter } from 'react-router-dom'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <AdminPage />
      </BrowserRouter>
    </>
  )
}

export default App
