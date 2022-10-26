import EventoService from "../services/EventoService"

export default function addEventoAction(id, palcos, eventos, setAddEvento, setEventos){
    let eventoValue = document.getElementById("addEventoArea").value
    let eventoTempo = document.getElementById("addEventoTempo").value

    let tempo
    switch (eventoTempo) {
        case '30s':
            tempo = 30
            break;
        case '1m':
            tempo = 60
            break;
        case '2m':
            tempo = 120
            break;
    }

    let palcoSelect = {}
    palcos.map((palco) => {
        if(palco.id === id) {
            return palcoSelect = {id: palco.id, palco: palco.palco}
        }
    })

    let Evento = {evento: eventoValue, filaPos: Number(eventos.length + 1), tempo: tempo, palco: palcoSelect}

    EventoService.createEvento(Evento)
    setAddEvento(false)

    let eventosFinal = [...eventos]
    eventosFinal.push(Evento)
    setEventos(eventosFinal)
}