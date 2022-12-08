import axios from 'axios';
import { auth } from './PalcoService';

const API = "https://warm-beyond-20336.herokuapp.com/api/usuarios";

class UsuarioService {

    getUsuario(){
        return axios.get(API, auth);
    }

    createUsuario(usuario){
        return axios.post(API, usuario, auth);
    }

    getUsuarioById(usuarioId){
        return axios.get(API + '/' + usuarioId, auth);
    }

    updateUsuario(usuario, usuarioId){
        return axios.put(API + '/' + usuarioId, usuario, auth);
    }

    deleteUsuario(usuarioId){
        return axios.delete(API + '/' + usuarioId, auth);
    }
}

export default new UsuarioService()