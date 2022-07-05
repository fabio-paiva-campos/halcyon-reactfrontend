import React from 'react'
import UsuarioService from '../services/UsuarioService';
import { useAppContext } from '../hooks/context';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

function Login() {
    const [logged, setLogged] = useAppContext()
    const [admin, setAdmin] = useAppContext()
    const [users, setUsers] = useState([])

    console.log(users)

    React.useEffect(() => {
        UsuarioService.getUsuario().then((res) => {setUsers(res.data)})
    }, []);
    
    function logCheck() {
        let usuarioValue = document.getElementById("loginInputUser").value
        let senhaValue = document.getElementById("loginInputPassword").value

        users.forEach((user) => {
            if(user.usuario === usuarioValue) {
                if(bcrypt.compareSync(senhaValue, user.senha) === true) {
                    setLogged(true)
                } else {
                    alert("Senha incorreta")
                }
            } else {
                alert("Usuário não existe")
            }
        })
    }

    return (
        <div className='loginContainer'>
            <div className = "login">
                <h2>Login:</h2>
                <ul className = "loginForm">
                    <li>
                        <input id = "loginInputUser" className='textArea' placeholder="Usuário" name="usuario" autoFocus />
                    </li>
                    <li>
                        <input id = "loginInputPassword" className='textArea' type='password' placeholder="Senha" name="senha" />
                    </li>
                    <li>
                        <button className="loginButton" onClick={() => (logCheck())}>Entrar</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Login