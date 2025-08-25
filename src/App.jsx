import './App.css'
import AdminLogin from './pages/loginPage'
import AdminPage from './pages/AdminPage'
import AdminRegister from './pages/registerPage'
import ProtectedRoute from './components/protectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

function App() {
  
  const [searchedItems, setsearchedItems] = useState('');

  const onSearchChange = (e) => {
    setsearchedItems(e.target.value.toLowerCase());
  };

  return (
    <>
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<AdminLogin />} />

            <Route path="/register" element={<AdminRegister />} />
            
            <Route path="/dashboard/*" 
            element={<ProtectedRoute>
                      <AdminPage onSearchChange={onSearchChange}
                                 searchedValue={searchedItems}/>
                    </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
