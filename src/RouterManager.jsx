import React from 'react'

import { BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App';
import Home from './pages/Home';
import Personalizacao from './pages/Personalizacao.jsx';
import Estoque from './pages/Estoque';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CarPage from './pages/CarPage.jsx';
import { PrivateRoute, RedirectLogin } from './PrivateRoute.jsx';
import Contatos from './pages/Contatos.jsx';


function RouterManager() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<RedirectLogin><Login/></RedirectLogin>}/>
          <Route element={<PrivateRoute><App /></PrivateRoute>}>
            <Route path="/" element={<Home />} />
            <Route path="/personalizacao" element={<Personalizacao />} />
            <Route path="/contatos" element={<Contatos />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/car/:id" element={<CarPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export default RouterManager