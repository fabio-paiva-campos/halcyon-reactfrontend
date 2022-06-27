import axios from 'axios';

const API = "http://localhost:8080/api/usuarios";

class UsuarioService {

    getUsuario(){
        return axios.get(API);
    }

    createUsuario(usuario){
        return axios.post(API, usuario);
    }

    getUsuarioById(usuarioId){
        return axios.get(API + '/' + usuarioId);
    }

    updateUsuario(usuario, usuarioId){
        return axios.put(API + '/' + usuarioId, usuario);
    }

    deleteUsuario(usuarioId){
        return axios.delete(API + '/' + usuarioId);
    }
}

export default new UsuarioService()