import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTipoPorId } from '../../services/tipoEquipoService';

export const TiposUpdate = () => {

    const { tipoid = '' } = useParams();
    console.log(tipoid);
    const [tipo, setTipo] = useState({});
    const [valoresForm, setValoresForm] = useState({});
    const { nombre = '', estado = '' } = valoresForm;

    const getTipo = async () => {
        try {
            const { data } = await getTipoPorId(tipoid);
            console.log(data);
            setTipo(data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getTipo();
    }, [tipoid]);

    useEffect(() => {
        setValoresForm({
            nombre: tipo.nombre,
            estado: tipo.estado,
        });

    }, [tipo]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value }); //spread
      }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const getUsuarios = {
            nombre, estado,
            tipo: {
                _id: tipo
            }
        }

        console.log(tipo);
      }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle Tipo Equipo</h5>
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
