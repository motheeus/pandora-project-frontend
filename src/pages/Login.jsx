import "../styles/Login.css"
import logoPandora from "../assets/pandora_project_logo.png";
import { useContext, useEffect, useState } from "react";
import axios from "../api/axios.js"
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router";
import {ToastContainer, toast} from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { user: userData, setUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const logar = () => {

        const user = { 
            username: username,
            password: password
        }

        axios.post('/signin', user)
            .then(res => {
                localStorage.setItem("pandora_user", JSON.stringify(res.data))
                setUser(res.data)
                navigate("/")
            })
            .catch(e => {
                toast.error(e.response.data)
            })
    }



    return (
        <>
        <ToastContainer/>
            <div className="login-fundo">
                <div className="login-maincontainer">
                    <div className="login-tela-login">
                            <div className="login-logo">
                            <a href="#">
                                <img src={logoPandora} alt="" />
                            </a>
                            </div>
                            <div className="login-tela-login-usuario">
                            <p className='login-p'>Matrícula de Identificação / Usuário</p>
                            <input onChange={(e) => setUsername(e.target.value)} className="login-input" name="username" type="text" />
                            </div>
                            <div className="login-tela-login-senha">
                            <p className='login-p'>Senha</p>
                            <input onChange={(e) => setPassword(e.target.value)} className="login-input" name="password" type="password" />
                            </div>
                        <button onClick={logar} className="login-botao-entrar">ENTRAR</button>
                    </div>
                </div>  
            </div>
        </>
  )
}

export default Login