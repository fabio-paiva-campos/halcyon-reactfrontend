import axios from 'axios';

const API = "http://localhost:8080/api/artistas";

class ArtistaService {

    getArtista(){
        return axios.get(API);
    }

    createArtista(artista){
        return axios.post(API, artista);
    }

    getArtistaById(artistaId){
        return axios.get(API + '/' + artistaId);
    }

    updateArtista(artista, artistaId){
        return axios.put(API + '/' + artistaId, artista);
    }

    deleteArtista(artistaId){
        return axios.delete(API + '/' + artistaId);
    }
}

export default new ArtistaService()