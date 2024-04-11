import React from 'react';
import ReactDOM from 'react-dom/client';
import {ToastContainer} from "react-toastify"


import Provider from './Context/AuthContext.jsx';
import RouterManager from './RouterManager.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider>
        <RouterManager/>
    </Provider>
  </React.StrictMode>
);
