import axios from 'axios';

const API = "https://warm-beyond-20336.herokuapp.com/api/papeis";

export const auth = {headers: {authorization: 'Basic ' + window.btoa("admin" + ":" + "1234") } }

class PapelService {

    getPapel(){
        return axios.get(API, auth);
    }

    createPapel(papel){
        return axios.post(API, papel, auth);
    }

    getPapelById(papelId){
        return axios.get(API + '/' + papelId, auth);
    }

    updatePapel(papel, papelId){
        return axios.put(API + '/' + papelId, papel, auth);
    }

    deletePapel(papelId){
        return axios.delete(API + '/' + papelId, auth);
    }
}

export default new PapelService()