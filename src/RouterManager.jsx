import React, {useEffect, useContext} from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Home from './pages/Home';
import VitrineVirtual from './pages/VitrineVirtual';
import Estoque from './pages/Estoque';
import Login from './pages/Login.jsx';
import { AuthContext } from "./Context/AuthContext.jsx";

function RouterManager() {
    const {setUser, user} = useContext(AuthContext)

    useEffect(() => {
      const getStorage = localStorage.getItem('pandora_user')
      setUser(JSON.parse(getStorage))
  
    },[])

  return (
    <BrowserRouter>
        <Routes>
            
            <Route path="/login" element={<Login />} />

            <Route element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="/vitrine" element={<VitrineVirtual />} />
                <Route path="/estoque" element={<Estoque />} />
            </Route>
            
        </Routes>
    </BrowserRouter>
  )
}

export default RouterManager