import React from 'react'
import UsuarioService from '../services/UsuarioService';
import { useAppContext } from '../hooks/context';
import { useState } from 'react';

function Login() {
    const [logged, setLogged] = useState(false)
    const [users, setUsers] = useState([])

    React.useEffect(() => {
        UsuarioService.getUsuario().then((res) => {setUsers(res.data)})
    }, []);

    console.log(users)
    
    function logCheck() {
        let usuarioValue = document.getElementById("loginInputUser").value
        let senhaValue = document.getElementById("loginInputPassword").value

        users.forEach((user) => {
            if(user.usuario === usuarioValue) {
                if(user.senha === senhaValue) {
                    setLogged(true)
                    console.log(logged)
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
                        <input id = "loginInputUser" className='textArea' placeholder="Usuário" name="usuario" rows={1} autoFocus/>
                    </li>
                    <li>
                        <input id = "loginInputPassword" className='textArea' placeholder="Senha" name="senha" rows={1}/>
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