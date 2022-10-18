import axios from 'axios';
import { auth } from './PalcoService';

const API = "http://localhost:8080/api/eventos";

class EventoService {

    getEvento(){
        return axios.get(API, auth);
    }

    createEvento(evento){
        return axios.post(API, evento, auth);
    }

    getEventoById(eventoId){
        return axios.get(API + '/' + eventoId, auth);
    }

    updateEvento(evento, eventoId){
        return axios.put(API + '/' + eventoId, evento, auth);
    }

    deleteEvento(eventoId){
        return axios.delete(API + '/' + eventoId, auth);
    }
}

export default new EventoService()