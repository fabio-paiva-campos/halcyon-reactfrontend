import { useEffect, useState } from 'react';
import UsuarioService from '../services/UsuarioService';
import { createId } from '../functions/createId';

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

    let usuario = {usuario: usuarioValue}

    UsuarioService.createUsuario(usuario)
    setAddUsuario(false)

    usuarios.push({id: createId, usuario: usuarioValue})
  }

  function editUsuarioAction(id){
    let usuarioValue = document.getElementById("editUsuarioArea").value

    let usuario = {usuario: usuarioValue}

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
    <div>
        <div className="palcoDiv">
          <div className='tableArea'>
            <div className='list'>
              <ul className='nextList'>
                {usuarios.map((u) => {
                    return (
                      <>
                        {editUsuario && selectedUsuario === u.id ? (
                          <input key={u.id} className='editUsuarioArea'>{u.artista}
                            <button className='artistaButton' onClick={() => (editUsuarioAction(selectedUsuario))}>✔</button>
                            <button className='artistaButton'  onClick={() => (setEditUsuario(false))}>🗙</button>
                          </input>
                        ) : (
                          <li key={u.id} className='labelSecondary'>{u.artista}
                            <button className='artistaButton' onClick={() => (deleteUsuarioAction(a.id))}>🗙</button>
                            <button className='artistaButton' onClick={() => (setEditUsuario(true), setSelectedUsuario(a.id))}>🖊</button>
                          </li>
                        )}  
                      </>
                    )
                  }
                )}
              </ul>
              <div className='addArtistaDiv'>
                {addUsuario ? (
                  <div>
                    <input id='addUsuarioArea' className='addArtistaArea' placeholder='Usuario'></input>
                    <button className='addArtistaButton' onClick={() => (addUsuarioAction(selectedPalco))}>✔</button>
                    <button className='addArtistaButton'  onClick={() => (setAddUsuario(false))}>🗙</button>
                  </div>
                ) : (
                    <button className='addArtista' onClick={() => (setAddUsuario(true), setSelectedUsuario(p.id))}>Adicionar Usuario</button>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cadastro;