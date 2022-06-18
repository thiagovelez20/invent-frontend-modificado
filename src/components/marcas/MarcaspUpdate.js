import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getMarcasPorId, editarMarca } from '../../services/marcaService';
import Swal from 'sweetalert2';

export const MarcaspUpdate = () => {

    const { marcaid = '' } = useParams();
    console.log(marcaid);
    const [marca, setMarca] = useState({});
    const [valoresForm, setValoresForm] = useState({});

    const { nombre = '', estado = '' } = valoresForm;

    const getMarca = async () => {
        try {
            const { data } = await getMarcasPorId(marcaid);
            console.log(data);
            setMarca(data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getMarca();
    }, [marcaid]);

    useEffect(() => {
        setValoresForm({
            nombre: marca.nombre,
            estado: marca.estado,
        });
    }, [marca]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value }); //spread
      }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const marcas = {
            nombre, estado,
            marca: {
                _id: marca
            }
        }

        console.log(marcaid);

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await editarMarca(marcaid, marcas);
            console.log(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
      }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle Marca</h5>
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
