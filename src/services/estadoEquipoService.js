import { axiosInstance } from '../helpers/axios-config';

//GET http://localhost:4000/estado-equipo
//POST http://localhost:4000/estado-equipo
//PUT http://localhost:4000/estado-equipo

const getEstadosEquipos= () => {
    return axiosInstance.get('estado-equipo', {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const crearEstados = (data) => {
    return axiosInstance.post('estado-equipo', data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const editarEstados = (EstadoEquipoId, data) => {
    return axiosInstance.put(`estado-equipo/${EstadoEquipoId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const getEstadoPorId= (estadoid) => {
    return axiosInstance.get(`estado-equipo/${estadoid}`, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

export {
    getEstadosEquipos, crearEstados, editarEstados, getEstadoPorId
}