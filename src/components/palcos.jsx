import { useEffect, useState } from 'react';
import PalcoService from '../services/PalcoService';
import EventoService from '../services/EventoService';
import Cadastro from './cadastro';
import addPalcoAction from '../functions/addPalcoAction';
import editPalcoAction from '../functions/editPalcoAction';
import deletePalcoAction from '../functions/deletePalco';
import addEventoAction from '../functions/addEvento';
import editEventoAction from '../functions/editEvento';
import deleteEventoAction from '../functions/deleteEvento';

function Palcos() {
  const [palcos, setPalcos] = useState([])
  const [eventos, setEventos] = useState([])
  const [addPalco, setAddPalco] = useState(false)
  const [addEvento, setAddEvento] = useState(false)
  const [editPalco, setEditPalco] = useState(false)
  const [selectedPalco, setSelectedPalco] = useState(0)
  const [editEvento, setEditEvento] = useState(false)
  const [selectedEvento, setSelectedEvento] = useState(0)
  const [cadastro, setCadastro] = useState(false)
  
  const [timer, setTimer] = useState('00:00:00');
  
  const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 / 60 / 60) % 24);
      return {
          total, hours, minutes, seconds
      };
  }
  
  const startTimer = (e) => {
      let { total, hours, minutes, seconds } 
                  = getTimeRemaining(e);
      if (total >= 0) {
          setTimer(
              (hours > 9 ? hours : '0' + hours) + ':' +
              (minutes > 9 ? minutes : '0' + minutes) + ':'
              + (seconds > 9 ? seconds : '0' + seconds)
          )
      }
  }
  
  const clearTimer = (e) => {
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
  }
  
  const getDeadTime = (t) => {
      let deadline = new Date();

      deadline.setSeconds(deadline.getSeconds() + t);
      return deadline;
  }

  const onClickReset = (t) => {
      clearTimer(getDeadTime(t));
  }

  useEffect(() => {
    PalcoService.getPalco().then((res) => {setPalcos(res.data)})
    EventoService.getEvento().then((res) => {setEventos(res.data)})
  }, [])

  function eventoDown(id, evento, filaPos, tempo, palco) {
    let newEvento = {id: id, evento: evento, filaPos: 2, tempo: tempo, palco: palco}

    EventoService.updateEvento(newEvento, id)

    let eventosFinal = [...eventos]
    eventosFinal.forEach((e) => {
      if(e.id === id) {
        e.filaPos = 2
      }
    })

    setEventos(eventosFinal)
  }

  function eventoCheck(id, evento, filaPos, tempo, palco) {
    let flag = 0

    eventos.forEach((e) => {
      if(e.filaPos === 1) {
        window.alert("Já tem um evento em andamento")
        flag = 1
      }
    })

    if(flag === 0) {
      eventoUp(id, evento, filaPos, tempo, palco)
    }
  }

  function eventoUp(id, evento, filaPos, tempo, palco) {
    let newEvento = {id: id, evento: evento, filaPos: 1, tempo: tempo, palco: palco}

    EventoService.updateEvento(newEvento, id)

    let eventosFinal = [...eventos]
    eventosFinal.forEach((e) => {
      if(e.id === id) {
        e.filaPos = 1
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
          <button className='addPalcoIcon' onClick={() => (addPalcoAction(palcos, setPalcos, setAddPalco))}>✔</button>
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
                  <button onClick={() => (setEditPalco(true), editPalcoAction(p.id, palcos, setPalcos, setEditPalco))}>✔</button>
                  <button onClick={() => (setEditPalco(false))}>🗙</button>
                </div>
              ) : (
                <div className='palcoLabelDiv'>
                  <label className='palcoLabel'>{p.palco}</label>
                  <button className='editPalcoIcon' onClick={() => (deletePalcoAction(p.id, eventos, palcos, setPalcos))}>🗙</button>
                  <button className='editPalcoIcon' onClick={() => (setEditPalco(true), setSelectedPalco(p.id))}>🖊</button>
                </div>
              )}
              <div className='tableArea'>
                <div className='list'>
                  <div className='playingDiv'>
                    <label className='playingLabel'>Em andamento</label>
                    <div>
                        {eventos.map((a) => {
                        if(a.palco.palco === p.palco && a.filaPos == 1) {
                          return (
                            <div key={a.id} className='playingEvento'>{a.evento}
                              <button className='EventoPos' onClick={() => (eventoDown(a.id, a.evento, a.filaPos, a.tempo, a.palco))}>⏷</button>
                              <span className='tempo'>{timer}</span>
                              <button className='start' onClick={() => (onClickReset(a.tempo))}>Começar</button>
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
                                <button className='EventoButton' onClick={() => (editEventoAction(selectedEvento, a.filaPos, a.palco.id, a.tempo, palcos, eventos, setEventos, setEditEvento))}>✔</button>
                                <select id='EventoPalco' className='EventoPalco'>
                                  {palcos.map((p) => { return (
                                    <option className='EventoPalcoOption' key={p.id}>{p.palco}</option>
                                  )})}
                                </select>
                              </div>
                            ) : (
                              <li key={a.id} className='labelSecondary'>{a.evento}
                                <button className='EventoButton' onClick={() => (deleteEventoAction(a.id, eventos, setEventos))}>🗙</button>
                                <button className='EventoButton' onClick={() => (setEditEvento(true), setSelectedEvento(a.id))}>🖊</button>
                                <button className='EventoButton' onClick={() => (eventoCheck(a.id, a.evento, a.filaPos, a.tempo, a.palco))}>🞁</button>
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
                        <select id='addEventoTempo' className='addEventoArea' placeholder='Duração do Evento'>
                          <option>30s</option>
                          <option>1m</option>
                          <option>2m</option>
                        </select>
                        <button className='addEventoButton' onClick={() => (addEventoAction(selectedPalco, palcos, eventos, setAddEvento, setEventos))}>✔</button>
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