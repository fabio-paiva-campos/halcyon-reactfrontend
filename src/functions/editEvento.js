import EventoService from "../services/EventoService"

export default function editEventoAction(id, filaPos, tempo, palcos, eventos, setEventos, setEditEvento){
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