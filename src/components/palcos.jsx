import { useEffect, useState } from 'react';
import PalcoService from '../services/PalcoService';
import EventoService from '../services/EventoService';
import KLJay from '../assets/KLJay.png';
import { useAppContext } from '../hooks/context';
import Cadastro from './cadastro';

function Palcos() {
  const [palcos, setPalcos] = useState([])
  const [eventos, setEventos] = useState([])
  const [addPalco, setAddPalco] = useState(false)
  const [addEvento, setAddEvento] = useState(false)
  const [editPalco, setEditPalco] = useState(false)
  const [selectedPalco, setSelectedPalco] = useState(0)
  const [editEvento, setEditEvento] = useState(false)
  const [selectedEvento, setSelectedEvento] = useState(0)
  const [admin, setAdmin] = useAppContext()
  const [cadastro, setCadastro] = useState(false)

  useEffect(() => {
    PalcoService.getPalco().then((res) => {setPalcos(res.data)})
    EventoService.getEvento().then((res) => {setEventos(res.data)})
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
    eventos.map((evento) => {
        if (evento.palco.id === id) {
            EventoService.deleteEvento(evento.id)
            deleteEvento(evento.id)
        }
    })

    let palcosFinal = [...palcos]
    if(window.confirm('Excluir Palco? Isso também excluirá todas os eventos que estão nele')) {
        PalcoService.deletePalco(id)
        palcosFinal.forEach((palco, index) => {
            if (palco.id === id) {
                palcosFinal.splice(index, 1)
            }
        })
        setPalcos(palcosFinal)
    }
  }

  function addEventoAction(id){
    let eventoValue = document.getElementById("addEventoArea").value

    let palcoSelect = {}
    palcos.map((palco) => {
        if(palco.id === id) {
            return palcoSelect = {id: palco.id, palco: palco.palco}
        }
    })

    let Evento = {evento: eventoValue, filaPos: Number(eventos.length + 1), tempo: 1, palco: palcoSelect}

    EventoService.createEvento(Evento)
    setAddEvento(false)

    let eventosFinal = [...eventos]
    eventosFinal.push(Evento)
    setEventos(eventosFinal)
  }

  function editEventoAction(id, filaPos, tempo){
    let eventoValue = document.getElementById("editEventoArea").value
    let palcoValue = document.getElementById("EventoPalco").value

    let palcoSelect = {}
    palcos.map((palco) => {
      if(palco.palco === palcoValue) {
          return palcoSelect = {id: palco.id, palco: palco.palco}
      }
    })

    let evento = {id: id, evento: eventoValue, filaPos: filaPos, tempo: tempo, palco: palcoSelect}

    EventoService.updateEvento(evento, id)

    let eventosFinal = [...eventos]
    eventosFinal.forEach((e) => {
        if(e.id === id) {
            e.evento = eventoValue
            e.palco = palcoSelect
        }
    })

    setEventos(eventosFinal)
    setEditEvento(false)
  }

  function deleteEvento(id){
    let eventosFinal = [...eventos]
    EventoService.deleteEvento(Number(id))
    eventosFinal.forEach((evento, index) => {
        if (evento.id === id) {
            eventosFinal.splice(index, 1)
        }
    })
    setEventos(eventosFinal)
  }

  function deleteEventoAction(id){
    let eventosFinal = [...eventos]
    if(window.confirm('Excluir Evento?')) {
        EventoService.deleteEvento(id)
        eventosFinal.forEach((evento, index) => {
            if (evento.id === id) {
                eventosFinal.splice(index, 1)
            }
        })
        setEventos(eventosFinal)
    }
  }

  function eventoDown(id, evento, filaPos, tempo, palco) {
    let newFilaPos

    if(Number(filaPos) < Number(eventos.length)) {
      newFilaPos = filaPos + 1
    } else {
      newFilaPos = filaPos
    }

    let newEvento = {id: id, evento: evento, filaPos: Number(newFilaPos), tempo: tempo, palco: palco}

    EventoService.updateEvento(newEvento, id)

    let eventosFinal = [...eventos]
    eventosFinal.forEach((e) => {
      if(e.id === id) {
        e.filaPos = newFilaPos
      }
    })

    setEventos(eventosFinal)
  }

  function eventoUp(id, evento, filaPos, tempo, palco) {
    let newEvento = {id: id, evento: evento, filaPos: Number(filaPos - 1), tempo: tempo, palco: palco}

    EventoService.updateEvento(newEvento, id)

    let eventosFinal = [...eventos]
    eventosFinal.forEach((e) => {
      if(e.id === id) {
        e.filaPos = Number(filaPos - 1)
      }
    })

    setEventos(eventosFinal)
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
                <div className='list'>
                  <div className='playingDiv'>
                    <label className='playingLabel'>Tocando agora</label>
                    <div>
                        {eventos.map((a) => {
                        if(a.palco.palco === p.palco && a.filaPos == 1) {
                          return (
                            <div key={a.id} className='playingEvento'>{a.evento}
                              <button className='EventoPos' onClick={() => (eventoDown(a.id, a.evento, a.filaPos, a.tempo, a.palco))}>⏷</button>
                            </div>
                          )
                        }
                        })}
                    </div>
                  </div>
                  <ul className='nextList'>Próximos
                    {eventos.map((a) => {
                      if(a.palco.palco === p.palco && a.filaPos != 1) {
                        return (
                          <>
                            {editEvento && selectedEvento === a.id ? (
                              <div className='editEventoDiv'>
                                <input key={a.id} id='editEventoArea' className='editEventoArea' defaultValue={a.evento} autoFocus></input>
                                <button className='EventoButton'  onClick={() => (setEditEvento(false))}>🗙</button>
                                <button className='EventoButton' onClick={() => (editEventoAction(selectedEvento, a.filaPos, a.palco.id, a.tempo))}>✔</button>
                                <select id='EventoPalco' className='EventoPalco'>
                                  {palcos.map((p) => { return (
                                    <option className='EventoPalcoOption' key={p.id}>{p.palco}</option>
                                  )})}
                                </select>
                              </div>
                            ) : (
                              <li key={a.id} className='labelSecondary'>{a.evento}
                                <button className='EventoButton' onClick={() => (deleteEventoAction(a.id))}>🗙</button>
                                <button className='EventoButton' onClick={() => (setEditEvento(true), setSelectedEvento(a.id))}>🖊</button>
                                <button className='EventoButton' onClick={() => (eventoDown(a.id, a.evento, a.filaPos, a.tempo, a.palco))}>⏷</button>
                                <button className='EventoButton' onClick={() => (eventoUp(a.id, a.evento, a.filaPos, a.tempo, a.palco))}>🞁</button>
                              </li>
                            )}  
                          </>
                        )
                      }
                    })}
                  </ul>
                  <div className='addEventoDiv'>
                    {addEvento && selectedPalco === p.id ? (
                      <div>
                        <input id='addEventoArea' className='addEventoArea' placeholder='Nome do Evento'></input>
                        <button className='addEventoButton' onClick={() => (addEventoAction(selectedPalco))}>✔</button>
                        <button className='addEventoButton'  onClick={() => (setAddEvento(false))}>🗙</button>
                      </div>
                    ) : (
                      <button className='addEvento' onClick={() => (setAddEvento(true), setSelectedPalco(p.id))}>Adicionar Evento</button>
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