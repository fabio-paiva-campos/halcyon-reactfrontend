import axios from 'axios';
import { auth } from './PalcoService';

const API = "http://localhost:8080/api/artistas";

class ArtistaService {

    getArtista(){
        return axios.get(API, auth);
    }

    createArtista(artista){
        return axios.post(API, artista, auth);
    }

    getArtistaById(artistaId){
        return axios.get(API + '/' + artistaId, auth);
    }

    updateArtista(artista, artistaId){
        return axios.put(API + '/' + artistaId, artista, auth);
    }

    deleteArtista(artistaId){
        return axios.delete(API + '/' + artistaId, auth);
    }
}

export default new ArtistaService()