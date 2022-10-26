import EventoService from "../services/EventoService"

export default function deleteEventoAction(id, eventos, setEventos) {
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