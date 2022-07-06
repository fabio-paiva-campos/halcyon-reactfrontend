import { useEffect, useState } from 'react';
import UsuarioService from '../services/UsuarioService';
import { createId } from '../functions/createId';
import bcrypt from 'bcryptjs';

function Cadastro() {
  const [usuarios, setUsuarios] = useState([])
  const [addUsuario, setAddUsuario] = useState(false)
  const [editUsuario, setEditUsuario] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState()

  useEffect(() => {
    UsuarioService.getUsuario().then((res) => {setUsuarios(res.data)})
  }, []);

  function addUsuarioAction(){
    let usuarioValue = document.getElementById("addUsuarioArea").value
    let senhaValue = document.getElementById("addSenhaArea").value
    let papelValue = document.getElementById("usuarioPapel").value

    let senhaCrypted = bcrypt.hashSync(senhaValue)

    let papelSelect = {}
    if (papelValue == "Administrador") {
      papelSelect = {id: 1, papel: "Administrador"}
    } else {
      papelSelect = {id: 2, papel: "Usuário"}
    }

    let usuario = {senha: senhaCrypted, usuario: usuarioValue, papel: papelSelect}

    UsuarioService.createUsuario(usuario)
    setAddUsuario(false)

    usuarios.push({id: createId, usuario: usuarioValue})
  }

  function editUsuarioAction(id){
    let usuarioValue = document.getElementById("editUsuarioArea").value
    let senhaValue = document.getElementById("editSenhaArea").value
    let papelValue = document.getElementById("usuarioPapel").value

    let senhaCrypted = bcrypt.hashSync(senhaValue)

    let papelSelect = {}
    if (papelValue == "Administrador") {
      papelSelect = {id: 1, papel: "Administrador"}
    } else {
      papelSelect = {id: 2, papel: "Usuário"}
    }

    let usuario = {id: id, senha: senhaCrypted, usuario: usuarioValue, papel: papelSelect}

    UsuarioService.updateUsuario(usuario, id)
    setEditUsuario(false)

    let usuariosFinal = [...usuarios]
    usuariosFinal.forEach((usuario) => {
      if(usuario.id === id) {
          usuario.usuario = usuarioValue
      }
    })

    setUsuarios(usuariosFinal)
    setEditUsuario(false)
  }

  function deleteUsuarioAction(id){
    let usuariosFinal = [...usuarios]

    if(window.confirm('Excluir Usuário?')) {
        UsuarioService.deleteUsuario(id)
        usuariosFinal.forEach((usuario, index) => {
            if (usuario.id === id) {
                usuariosFinal.splice(index, 1)
            }
        })
        setUsuarios(usuariosFinal)
    }
  }

  return (
    <div className='userDiv'>
      <h3 className='usersLabel'>Usuários</h3>
      <ul className='userList'>
        {usuarios.map((u) => {
            return (
              <>
                {editUsuario && selectedUsuario === u.id ? (
                  <>
                    <input id='editUsuarioArea' className='editUsuarioArea' defaultValue={u.usuario} autoFocus />
                    <input type='password' id='editSenhaArea' className='editUsuarioArea' />
                    <select id='usuarioPapel' className='usuarioPapel'>
                      <option value="Administrador">Administrador</option>
                      <option value='Usuário'>Usuário</option>
                    </select>
                    <button className='usuarioButton' onClick={() => (editUsuarioAction(selectedUsuario))}>✔</button>
                    <button className='usuarioButton'  onClick={() => (setEditUsuario(false))}>🗙</button>
                  </>
                ) : (
                  <li key={u.id} className='usuarioLabel'>{u.usuario}
                    <button className='usuarioButton' onClick={() => (deleteUsuarioAction(u.id))}>🗙</button>
                    <button className='usuarioButton' onClick={() => (setEditUsuario(true), setSelectedUsuario(u.id))}>🖊</button>
                  </li>
                )}  
              </>
            )
          }
        )}
      </ul>
      <div className='addUsuarioDiv'>
        {addUsuario ? (
          <div>
            <input id='addUsuarioArea' className='addUsuarioArea' placeholder='Usuário'></input>
            <input type='password' id='addSenhaArea' className='addUsuarioArea' placeholder='Senha' />
            <select id='usuarioPapel' className='usuarioPapel'>
              <option value="Administrador">Administrador</option>
              <option value='Usuário'>Usuário</option>
            </select>
            <button className='addUsuarioButton'  onClick={() => (setAddUsuario(false))}>🗙</button>
            <button className='addUsuarioButton' onClick={() => (addUsuarioAction())}>✔</button>
          </div>
        ) : (
            <button className='addUsuario' onClick={() => (setAddUsuario(true))}>Adicionar Usuario</button>
        )}
      </div>
    </div>
  )
}

export default Cadastro;