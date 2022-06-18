import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getInventariosPorId, editInventario } from '../../services/inventarioService';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipos } from '../../services/tipoEquipoService';
import { getEstadosEquipos } from '../../services/estadoEquipoService';
import Swal from 'sweetalert2';

export const InventarioUpdate = () => {

    const { inventarioId = '' } = useParams();
    const [inventario, setInventario] = useState({});
    const [valoresForm, setValoresForm] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);

    const { serial = '', modelo = '', descripcion = '', color = '', foto = '',
        fechaCompra = '', precio = '', usuario, marca, tipo, estado } = valoresForm;

    //listar usuarios
    const listarUsuarios = async () => {
        try {
            const { data } = await getUsuarios();
            setUsuarios(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarUsuarios();
    }, []);

    //listar Marcas
    const listarMarcas = async () => {
        try {
            const { data } = await getMarcas();
            setMarcas(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarMarcas();
    }, []);

    //listar Tipos
    const listarTipos = async () => {
        try {
            const { data } = await getTiposEquipos();
            setTipos(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarTipos();
    }, []);

    //listar Estados
    const listarEstados = async () => {
        try {
            const { data } = await getEstadosEquipos();
            setEstados(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstados();
    }, []);

    const getInventario = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getInventariosPorId(inventarioId)
            console.log(data);
            Swal.close();
            setInventario(data)
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getInventario();
    }, [inventarioId]);

    //seteo de formulario para obtener los valores del inventario a cada caja de texto
    useEffect(() => {
        setValoresForm({
            serial: inventario.serial,
            modelo: inventario.modelo,
            descripcion: inventario.descripcion,
            color: inventario.color,
            foto: inventario.foto,
            fechaCompra: inventario.fechaCompra,
            precio: inventario.precio,
            usuario: inventario.usuario,
            marca: inventario.marca,
            tipo: inventario.tipoEquipo,
            estado: inventario.estadoEquipo,
        });
    }, [inventario]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value }); //spread
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto,
            fechaCompra, precio,
            usuario: {
                _id: usuario
            },
            marca: {
                _id: marca
            },
            tipoEquipo: {
                _id: tipo
            },
            estadoEquipo: {
                _id: estado
            }

        }

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await editInventario(inventarioId, inventario);
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
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle Activo</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={inventario?.foto} alt='' />
                        </div>
                        {/*formulario */}
                        <div className='col-md-8'>
                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Serial</label>
                                            <input type="text" name='serial' required value={serial} onChange={(e) => handleOnChange(e)} className="form-control" />
                                        </div>

                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Modelo</label>
                                            <input type="text" name='modelo' required value={modelo} onChange={(e) => handleOnChange(e)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Descripción</label>
                                            <input type="text" name='descripcion' required value={descripcion} onChange={(e) => handleOnChange(e)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Foto</label>
                                            <input type="url" name='foto' required value={foto} onChange={(e) => handleOnChange(e)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Color</label>
                                            <input type="text" name='color' required value={color} onChange={(e) => handleOnChange(e)} className="form-control" />
                                        </div>

                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Compra</label>
                                            <input type='date' name='fechaCompra' required value={fechaCompra} onChange={(e) => handleOnChange(e)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Precio</label>
                                            <input type="number" name='precio' required value={precio} onChange={(e) => handleOnChange(e)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Usuario</label>
                                            {/*select de usuarios */}
                                            <select className="form-select" onChange={(e) => handleOnChange(e)} name='usuario' required value={usuario}>
                                                <option value="">Seleccione</option>
                                                {
                                                    usuarios.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id} >
                                                            {nombre}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Marca</label>
                                            {/*select de marcas */}
                                            <select className="form-select" onChange={(e) => handleOnChange(e)} name='marca' required value={marca}>
                                                <option value="">Seleccione</option>
                                                {
                                                    marcas.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id} >
                                                            {nombre}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Tipo Equipo</label>
                                            {/*select de marcas */}
                                            <select className="form-select" onChange={(e) => handleOnChange(e)} name='tipo' required value={tipo}>
                                                <option value="">Seleccione</option>
                                                {
                                                    tipos.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id} >
                                                            {nombre}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Estado Equipo</label>
                                            {/*select de marcas */}
                                            <select className="form-select" onChange={(e) => handleOnChange(e)} name='estado' required value={estado}>
                                                <option value="">Seleccione</option>
                                                {
                                                    estados.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id} >
                                                            {nombre}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <button className='btn btn-dark'>Editar</button>
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

