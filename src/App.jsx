import React, { useContext, useEffect } from "react";
import Header from "./components/Header.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx"
import "./styles/App.css"
import { Outlet } from "react-router";
import {ToastContainer, toast} from "react-toastify"

function App() {

  return (
    <>
      <div className="app">
        <Header />
        <div className="content">
          <div className="outlet-scroll"><Outlet/></div>
          <ToastContainer position="bottom-right"/>
        </div>
      </div>
      <GlobalStyle />
    </>
  );
}

export default App;
