import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'; // hooks para optener los parametros enviados por la url
import { getUsuariosPorId, editarUsuarios } from '../../services/usuarioService' //importamos el metodo getUsuariosPorId creado en suarioService 
import Swal from 'sweetalert2';

export const UsuarUpdate = () => {

    //const params = useParams(); objeto params estructurado 
    //console.log(params);

    const { usuarioId = '' } = useParams(); //objeto params desestructurado 
    console.log(usuarioId);
    const [usuario, setUsuario] = useState({});
    const [valoresForm, setValoresForm] = useState({});

    const { nombre = '', email = '', estado = '' } = valoresForm;

    const getUsuario = async () => {
        try {
            const { data } = await getUsuariosPorId(usuarioId);
            console.log(data);
            setUsuario(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsuario();
    }, [usuarioId]);

    useEffect(() => {
        setValoresForm({
            nombre: usuario.nombre,
            email: usuario.email,
            estado: usuario.estado,
        });

    }, [usuario]);

    //despues de realizar todo esto, debemos crear el metodo editar en el backend en la carpeta router usuario.js

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value }); //spread
    }

    const handleonSubmit = async (e) => { //handleOnSubmit
        e.preventDefault();
        const getUsuarios = {
            nombre, email, estado,
            usuario: {
                _id: usuario
            }
        }

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await editarUsuarios(usuarioId, getUsuarios);
            console.log(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            Swal.close();

            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = 'Ocurrio un error, por favor verifique los datos';
            }
            Swal.fire('Error', mensaje, 'error');
        }
    }

    return (
        <div className='container-fluid mt-3 mb-9'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle Usuario</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <form onSubmit={(e) => handleonSubmit(e)}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input required name="nombre" value={nombre} type="text" className="form-control"
                                        onChange={(e) => handleOnChange(e)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">email</label>
                                    <input required name="email" value={email} type="text" className="form-control"
                                        onChange={(e) => handleOnChange(e)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select required name="estado" value={estado} className="form-select"
                                        onChange={(e) => handleOnChange(e)}>
                                        <option selected value="">...Seleccione...</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <button id='btn_act'>Actualizar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}