import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEstadoPorId } from '../../services/estadoEquipoService';

export const EstadosUpdate = () => {

    const { estadoid = '' } = useParams();
    console.log(estadoid);
    const [estadoEquipo, setEstadoEquipo] = useState({});
    const [valoresForm, setValoresForm] = useState({});
    const { nombre = '', estado = '' } = valoresForm;

    const getEstado = async () => {
        try {
            const { data } = await getEstadoPorId(estadoid);
            console.log(data);
            setEstadoEquipo(data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getEstado();
    }, [estadoid]);

    useEffect(() => {
        setValoresForm({
            nombre: estadoEquipo.nombre,
            estado: estadoEquipo.estado,
        });

    }, [estadoEquipo]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value }); //spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const getUsuarios = {
            nombre, estado,
            estado: {
                _id: estado
            }
        }

        console.log(estadoEquipo);
    }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle Estado Equipo</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <form onSubmit={(e) => handleOnSubmit(e)} >
                                <div className="mb-4">
                                    <label className="form-label">Nombre</label>
                                    <input name='nombre' required value={nombre} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Estado</label>
                                    <select name='estado' required value={estado} className="form-select" onChange={(e) => handleOnChange(e)}>
                                        <option selected value="">--Seleccione--</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <button  id='btn_act'>Actualizar</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
