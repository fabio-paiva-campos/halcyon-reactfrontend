import axios from 'axios';

const API = "http://localhost:8080/api/palcos";

class PalcoService {

    getPalco(){
        return axios.get(API);
    }

    createPalco(palco){
        return axios.post(API, palco);
    }

    getPalcoById(palcoId){
        return axios.get(API + '/' + palcoId);
    }

    updatePalco(palco, palcoId){
        return axios.put(API + '/' + palcoId, palco);
    }

    deletePalco(palcoId){
        return axios.delete(API + '/' + palcoId);
    }
}

export default new PalcoService()