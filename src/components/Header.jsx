import React, { useState, useContext } from "react";
import "../styles/Header.css";
import logoPandora from "../assets/pandora_project_logo.png";
import defaultUser from "../assets/user.png";
import { MdOutlineKeyboardArrowDown, MdHome, MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const LoginArea = ({ nomeUsuario, userId }) => {
  const numero = "" + userId + ""
  const numerocontato = numero.padStart(4, 0)

  return (
    <>
      <div className="login-area">
        <div className="login-area-wrapper">
          <div className="login-area-userImg">
            <img src={defaultUser}></img>
          </div>
          <div className="login-area-userData">
            <span className="login-area-userData-name">{nomeUsuario}</span>
            <span>{numerocontato}</span>
          </div>
          <MdOutlineKeyboardArrowDown />
        </div>
        <UserDropDown/>
      </div>
    </>
  );
};

const UserDropDown = () => {
  const {user, setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('pandora_user')
    setUser(null)
    navigate('/login')
  }

  return (
    <div className="user-dropdown">
      <ul>
          <a href=""><li><FaCog className="li-icons"/>Configurações da Conta</li></a>
          {user.cargo =="admin" &&<a onClick={() => navigate('/dashboard')}href=""><li><MdOutlineDashboard className="li-icons"/>Painel de Controle</li></a>}
          <p className="li-separador"></p>
          <a href="" onClick={logout}><li className="logout"><MdOutlineLogout className="li-icons"/>Sair</li></a>
      </ul>
    </div>
  )
}

export default function Header() {

  const {user} = useContext(AuthContext)

  return (
    <>
      <div className="container">
        <div className="parte-superior">
          <div className="logo">
            <Link to="/">
              <img src={logoPandora}/>
            </Link>
          </div>

          <input type="text" placeholder="Pesquisar..."></input>

          <LoginArea nomeUsuario={`${user.name} ${user.sobrenome}`} userId={user.id}></LoginArea>
        </div>

        <div className="parte-inferior">
          <nav>
            <NavLink to="/">
              <MdHome className="logo" />
            </NavLink>

            <NavLink to="/estoque">Estoque</NavLink>

            <NavLink to="/vitrine">Vitrine Virtual</NavLink>

            <NavLink to="/clientes">Clientes</NavLink>
          </nav>
        </div>
      </div>
    </>
  );
}
