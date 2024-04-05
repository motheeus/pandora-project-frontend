import React from 'react'

import { BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App';
import Home from './pages/Home';
import VitrineVirtual from './pages/VitrineVirtual';
import Estoque from './pages/Estoque';
import Login from './pages/Login.jsx';
import { PrivateRoute, RedirectLogin } from './PrivateRoute.jsx';

function RouterManager() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<RedirectLogin><Login/></RedirectLogin>}/>
          <Route element={<PrivateRoute><App /></PrivateRoute>}>
            <Route path="/" element={<Home />} />
            <Route path="/vitrine" element={<VitrineVirtual />} />
            <Route path="/estoque" element={<Estoque />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export default RouterManager