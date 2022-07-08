import { useEffect, useState } from 'react';
import PalcoService from '../services/PalcoService';
import ArtistaService from '../services/ArtistaService';
import KLJay from '../assets/KLJay.png';
import { useAppContext } from '../hooks/context';
import Cadastro from './cadastro';

function Palcos() {
  const [palcos, setPalcos] = useState([])
  const [artistas, setArtistas] = useState([])
  const [addPalco, setAddPalco] = useState(false)
  const [addArtista, setAddArtista] = useState(false)
  const [editPalco, setEditPalco] = useState(false)
  const [selectedPalco, setSelectedPalco] = useState(0)
  const [editArtista, setEditArtista] = useState(false)
  const [selectedArtista, setSelectedArtista] = useState(0)
  const [admin, setAdmin] = useAppContext()
  const [cadastro, setCadastro] = useState(false)

  useEffect(() => {
    PalcoService.getPalco().then((res) => {setPalcos(res.data)})
    ArtistaService.getArtista().then((res) => {setArtistas(res.data)})
  }, [])

  function addPalcoAction(){
    let palcoValue = document.getElementById("addPalcoArea").value

    let palco = {palco: palcoValue}

    PalcoService.createPalco(palco)
    setAddPalco(false)

    let palcosFinal = [...palcos]
    palcosFinal.push(palco)
    setPalcos(palcosFinal)
  }

  function editPalcoAction(id){
    let palcoValue = document.getElementById("editPalcoArea").value

    let palco = {palco: palcoValue}

    PalcoService.updatePalco(palco, id)
    setEditPalco(false)

    let palcosFinal = [...palcos]
    palcosFinal.forEach((palco) => {
        if(palco.id === id) {
            palco.palco = palcoValue
        }
    })

    setPalcos(palcosFinal)
    setEditPalco(false)
  }

  function deletePalcoAction(id){
    artistas.map((artista) => {
        if (artista.palco.id === id) {
            ArtistaService.deleteArtista(artista.id)
            deleteArtista(artista.id)
        }
    })

    let palcosFinal = [...palcos]
    if(window.confirm('Excluir Palco? Isso também excluirá todas os artistas que estão nele')) {
        PalcoService.deletePalco(id)
        palcosFinal.forEach((palco, index) => {
            if (palco.id === id) {
                palcosFinal.splice(index, 1)
            }
        })
        setPalcos(palcosFinal)
    }
  }

  function addArtistaAction(id){
    let artistaValue = document.getElementById("addArtistaArea").value

    let palcoSelect = {}
    palcos.map((palco) => {
        if(palco.id === id) {
            return palcoSelect = {id: palco.id, palco: palco.palco}
        }
    })

    let artista = {artista: artistaValue, filaPos: artistas.length + 1, tempo: 1, palco: palcoSelect}

    ArtistaService.createArtista(artista)
    setAddArtista(false)

    let artistasFinal = [...artistas]
    artistasFinal.push(artista)
    setArtistas(artistasFinal)
  }

  function editArtistaAction(id, filaPos){
    let artistaValue = document.getElementById("editArtistaArea").value
    let palcoValue = document.getElementById("artistaPalco").value

    let palcoSelect = {}
    palcos.map((palco) => {
      if(palco.palco === palcoValue) {
          return palcoSelect = {id: palco.id, palco: palco.palco}
      }
    })

    let artista = {id: id, artista: artistaValue, filaPos: filaPos, tempo: 1, palco: palcoSelect}

    ArtistaService.updateArtista(artista, id)
    setEditArtista(false)

    let artistasFinal = [...artistas]
    artistasFinal.forEach((artista) => {
        if(artista.id === id) {
            artista.artista = artistaValue
            artista.palco = palcoSelect
        }
    })

    setArtistas(artistasFinal)
    setEditArtista(false)
  }

  function deleteArtista(id){
    let artistasFinal = [...artistas]
    ArtistaService.deleteArtista(id)
    artistasFinal.forEach((artista, index) => {
        if (artista.id === id) {
            artistasFinal.splice(index, 1)
        }
    })
    setArtistas(artistasFinal)
  }

  function deleteArtistaAction(id){
    let artistasFinal = [...artistas]
    if(window.confirm('Excluir Artista?')) {
        ArtistaService.deleteArtista(id)
        artistasFinal.forEach((artista, index) => {
            if (artista.id === id) {
                artistasFinal.splice(index, 1)
            }
        })
        setArtistas(artistasFinal)
    }
  }

  function artistaDown(id, artista, filaPos, tempo, palco) {
    let newFilaPos = Number(filaPos + 1)
    console.log(newFilaPos)
    let newArtista = {artista: artista, filaPos: newFilaPos, tempo: tempo, palco: {id: 1, palco: "Principal"}}

    ArtistaService.updateArtista(artista, id)

    let artistasFinal = [...artistas]
    artistasFinal.forEach((artista) => {
      if(artista.id === id) {
        artista = newArtista
      }
    })

    setArtistas(artistasFinal)
  }

  function artistaUp(id, artista, filaPos, tempo, palco) {
    let newArtista = {artista: artista, filaPos: filaPos, tempo: tempo, palco: palco}
    console.log(filaPos)

    ArtistaService.updateArtista(artista, id)

    let artistasFinal = [...artistas]
    artistasFinal.forEach((artista) => {
      if(artista.id === id) {
        artista = newArtista
      }
    })

    setArtistas(artistasFinal)
  }

  return (
    <div>
      <button className='addPalcoIcon' onClick={() => (setAddPalco(!addPalco))}>+</button>
      {addPalco ? (
        <div className='addPalcoDiv'>
          <input id='addPalcoArea' className='addPalcoArea' placeholder='Nome do Palco'></input>
          <button className='addPalcoIcon' onClick={() => (addPalcoAction())}>✔</button>
        </div>
      ) : (
        null
      )}
      <button  className='toggle' onClick={() => (setCadastro(!cadastro))}>Usuários</button>
      {cadastro ? (
        <Cadastro/>
      ) : (
        <div>
          {palcos.map((p) => {return(
            <div key={p.id} className="palcoDiv">
              {editPalco && selectedPalco === p.id ? (
                <div>
                  <input id='editPalcoArea' defaultValue={p.palco}></input>
                  <button onClick={() => (setEditPalco(true), editPalcoAction(p.id))}>✔</button>
                  <button onClick={() => (setEditPalco(false))}>🗙</button>
                </div>
              ) : (
                <div className='palcoLabelDiv'>
                  <label className='palcoLabel'>{p.palco}</label>
                  <button className='editPalcoIcon' onClick={() => (deletePalcoAction(p.id))}>🗙</button>
                  <button className='editPalcoIcon' onClick={() => (setEditPalco(true), setSelectedPalco(p.id))}>🖊</button>
                </div>
              )}
              <div className='tableArea'>
                <img className='pic' src={KLJay}></img>
                <div className='list'>
                  <div className='playingDiv'>
                    <label className='playingLabel'>Tocando agora</label>
                    <div>
                        {artistas.map((a) => {
                        if(a.palco.palco === p.palco && a.filaPos == 0) {
                          return (
                            <div key={a.id} className='playingArtista'>{a.artista}
                              <button className='artistaPos' onClick={() => (artistaDown(a.id, a.artista, a.filaPos, a.tempo, a.palco))}>⏷</button>
                            </div>
                          )
                        }
                        })}
                    </div>
                  </div>
                  <ul className='nextList'>Próximos
                    {artistas.map((a) => {
                      if(a.palco.palco === p.palco && a.filaPos != 0) {
                        return (
                          <>
                            {editArtista && selectedArtista === a.id ? (
                              <div className='editArtistaDiv'>
                                <input key={a.id} id='editArtistaArea' className='editArtistaArea' defaultValue={a.artista} autoFocus></input>
                                <button className='artistaButton'  onClick={() => (setEditArtista(false))}>🗙</button>
                                <button className='artistaButton' onClick={() => (editArtistaAction(selectedArtista, a.filaPos, a.palco.id))}>✔</button>
                                <select id='artistaPalco' className='artistaPalco'>
                                  {palcos.map((p) => { return (
                                    <option className='artistaPalcoOption' key={p.id}>{p.palco}</option>
                                  )})}
                                </select>
                              </div>
                            ) : (
                              <li key={a.id} className='labelSecondary'>{a.artista}
                                <button className='artistaButton' onClick={() => (deleteArtistaAction(a.id))}>🗙</button>
                                <button className='artistaButton' onClick={() => (setEditArtista(true), setSelectedArtista(a.id))}>🖊</button>
                                <button className='artistaButton' onClick={() => (artistaDown(a.id, a.artista, a.filaPos, a.tempo, a.palco))}>⏷</button>
                                <button className='artistaButton' onClick={() => (artistaUp(a.id, a.artista, a.filaPos, a.tempo, a.palco))}>🞁</button>
                              </li>
                            )}  
                          </>
                        )
                      }
                    })}
                  </ul>
                  <div className='addArtistaDiv'>
                    {addArtista && selectedPalco === p.id ? (
                      <div>
                        <input id='addArtistaArea' className='addArtistaArea' placeholder='Nome do Artista'></input>
                        <button className='addArtistaButton' onClick={() => (addArtistaAction(selectedPalco))}>✔</button>
                        <button className='addArtistaButton'  onClick={() => (setAddArtista(false))}>🗙</button>
                      </div>
                    ) : (
                        <button className='addArtista' onClick={() => (setAddArtista(true), setSelectedPalco(p.id))}>Adicionar Artista</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  )
}

export default Palcos;