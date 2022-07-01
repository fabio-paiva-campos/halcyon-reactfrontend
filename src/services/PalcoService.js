import axios from 'axios';

const API = "http://localhost:8080/api/palcos";

export const auth = {headers: {authorization: 'Basic ' + window.btoa("admin" + ":" + "1234") } }

class PalcoService {

    getPalco(){
        return axios.get(API, auth);
    }

    createPalco(palco){
        return axios.post(API, palco, auth);
    }

    getPalcoById(palcoId){
        return axios.get(API + '/' + palcoId, auth);
    }

    updatePalco(palco, palcoId){
        return axios.put(API + '/' + palcoId, palco, auth);
    }

    deletePalco(palcoId){
        return axios.delete(API + '/' + palcoId, auth);
    }
}

export default new PalcoService()