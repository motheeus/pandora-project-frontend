import React, { useContext, useEffect } from "react";
import Header from "./components/Header.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx"
import "./styles/App.css"
import { Outlet } from "react-router";


function App() {

  return (
    <>
      <div className="app">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <GlobalStyle />
    </>
  );
}

export default App;
