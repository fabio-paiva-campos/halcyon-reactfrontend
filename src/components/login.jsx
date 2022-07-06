import UsuarioService from '../services/UsuarioService';
import PapelService from '../services/PapelService';
import { useAppContext } from '../hooks/context';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

function Login() {
    const [logged, setLogged] = useAppContext()
    const [admin, setAdmin] = useAppContext()
    const [users, setUsers] = useState([])
    const [papeis, setPapeis] = useState([])

    useEffect(() => {
        PapelService.getPapel().then((res) => {setPapeis(res.data)})
        UsuarioService.getUsuario().then((res) => {setUsers(res.data)})
    }, [])

    function papelCheck() {
        if(papeis.length == 0) {
            PapelService.createPapel({papel: "Administrador"})
            PapelService.createPapel({papel: "Usuário"})
        }

        userCheck()
    }

    function userCheck() {
        if(users.length == 0) {
            let senhaCrypted = bcrypt.hashSync("1234")
            let admin = {senha: senhaCrypted, usuario: "admin", papel: {id: 1, papel: "Administrador"}}
            UsuarioService.createUsuario(admin)
            users.push(admin)
        }

        logCheck()
    }
    
    function logCheck() {
        let usuarioValue = document.getElementById("loginInputUser").value
        let senhaValue = document.getElementById("loginInputPassword").value

        let flag = false

        users.forEach((user) => {
            if(user.usuario == usuarioValue) {
                if(bcrypt.compareSync(senhaValue, user.senha) === true) {
                    setLogged(true)
                    flag = true
                    if(user.papel === {id: 1, papel: "Administrador"}) {
                        setAdmin(true)
                        console.log(admin)
                    }
                } else {
                    alert("Senha incorreta")
                    flag = true
                }
            } else {
                if(flag == false){
                    alert("Usuário não existe")
                    flag = true
                }
            }
        })
    }

    return (
        <div className='loginContainer'>
            <div className = "login">
                <h2 className='loginLabel'>Login:</h2>
                <ul className = "loginForm">
                    <li><input id = "loginInputUser" className='textArea' placeholder="Usuário" name="usuario" autoFocus /></li>
                    <li><input id = "loginInputPassword" className='textArea' type='password' placeholder="Senha" name="senha" /></li>
                    <li><button className="loginButton" onClick={() => (papelCheck())}>Entrar</button></li>
                </ul>
            </div>
        </div>
    )
}

export default Login