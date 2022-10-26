import PalcoService from '../services/PalcoService';
import EventoService from '../services/EventoService';
import deleteEvento from './deleteEvento';

export default function deletePalcoAction(id, eventos, palcos, setPalcos, setEventos) {
    eventos.map((evento) => {
        if (evento.palco.id === id) {
            EventoService.deleteEvento(evento.id)
            deleteEvento(evento.id, eventos, setEventos)
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