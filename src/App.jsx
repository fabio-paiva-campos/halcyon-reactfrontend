import './styles/style.scss'
import { useEffect, useState } from 'react';
import PalcoService from './services/PalcoService';
import ArtistaService from './services/ArtistaService';
import { createId } from './functions/createId';

const data = [
  {id: 1, palco: "Principal", artistas: [{id: 1, artista: "DJ Marky"}]},
  {id: 2, palco: "Secundario", artistas: [{id: 1, artista: "DJ Paulão"}]}
]

function App() {
  const [palcos, setPalcos] = useState([])
  const [artistas, setArtistas] = useState([])
  const [addPalco, setAddPalco] = useState(false)
  const [addArtista, setAddArtista] = useState(false)
  const [editPalco, setEditPalco] = useState(false)
  const [selectedPalco, setSelectedPalco] = useState(0)
  const [tocando, setTocando] = useState([])

  useEffect(() => {
    PalcoService.getPalco().then((res) => {setPalcos(res.data)})
    ArtistaService.getArtista().then((res) => {setArtistas(res.data)})
  }, [])

  function addPalcoAction(){
    let palcoValue = document.getElementById("addPalcoArea").value

    let palco = {palco: palcoValue}

    PalcoService.createPalco(palco)
    setAddPalco(false)

    palcos.push({id: createId, palco: palcoValue})
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

  function addArtistaAction(id){
    let artistaValue = document.getElementById("addArtistaArea").value

    let palcoSelect = {}
    palcos.map((palco) => {
        if(palco.id === id) {
            return palcoSelect = {id: palco.id, palco: palco.palco}
        }
    })

    let artista = {artista: artistaValue, filaPos: 2, tempo: 1, palco: palcoSelect}

    ArtistaService.createArtista(artista)
    setAddArtista(false)

    artistas.push(artista)
  }

  return (
    <div>
      <button className='addPalcoIcon' onClick={() => (setAddPalco(!addPalco))}>+</button>
      {addPalco ? (
        <div>
          <input id='addPalcoArea' placeholder='Nome do Palco'></input>
          <button onClick={() => (addPalcoAction())}>✔</button>
        </div>
      ) : (
        null
      )}
      {palcos.map((p) => {return(
        <div key={p.id} className="palcoDiv">
          {editPalco && selectedPalco === p.id ? (
            <div>
              <input id='editPalcoArea' defaultValue={p.palco}></input>
              <button onClick={() => (editPalcoAction(p.id))}>✔</button>
              <button onClick={() => (setEditPalco(false))}>🗙</button>
            </div>
          ) : (
            <div>
              <label className='palcoLabel'>{p.palco}</label>
              <button className='editPalcoIcon' onClick={() => (setEditPalco(true), setSelectedPalco(p.id))}>🖊</button>
            </div>
          )}
          <div className='tableArea'>
            <label className='pic'>pic</label>
            <div className='list'>
            <label className='label'>Tocando agora</label>
            {artistas.map((a) => {
              if(a.palco.palco === p.palco && a.filaPos == 0) {
                return <label key={a.id} className='labelTocando'>{a.artista}</label>
              }
            })}
            <ul className='nextList'>Próximos
              {artistas.map((a) => {
                if(a.palco.palco === p.palco && a.filaPos != 0) {
                  return <li key={a.id} className='labelSecondary'>{a.artista}</li>
                }
              })}
            </ul>
            <button onClick={() => (setAddArtista(!addArtista), setSelectedPalco(p.id))}>Adicionar Artista</button>
              {addArtista && selectedPalco === p.id ? (
                <div>
                  <input id='addArtistaArea' placeholder='Nome do Artista'></input>
                  <button onClick={() => (addArtistaAction(selectedPalco))}>✔</button>
                </div>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
      )})}
    </div>
  );
}

export default App;