import { axiosInstance } from '../helpers/axios-config';

//GET http://localhost:4000/tipo-equipo
//POST http://localhost:4000/tipo-equipo
//PUT http://localhost:4000/tipo-equipo

const getTiposEquipos = () => {
    return axiosInstance.get('tipo-equipo', {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const crearTipos = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const editarTipos= (tipoId, data) => {
    return axiosInstance.put(`tipo-equipo/${tipoId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const getTipoPorId = (tipoId) => {
    return axiosInstance.get(`tipo-equipo/${tipoId}`, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

export {
    getTiposEquipos, crearTipos, editarTipos, getTipoPorId
}