import React from 'react'
import { Link } from 'react-router-dom';

export const InventarioCard = (props) => {

    const { inventario } = props;

    return (
        <div className="col">
            <div className="card border border-primary">
                <img src={inventario.foto} className="card-img-top img-style" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Caracteristicas</h5>
                    <hr />
                    <p className='card-text'>{`Serial: ${inventario.serial}`}</p>
                    <p className='card-text'>{`Marca: ${inventario.marca.nombre}`}</p>
                    <p className='card-text'>{`Estado: ${inventario.marca.estado}`}</p>
                    <p className='card-text'>{`Tipo Equipo: ${inventario.tipoEquipo.nombre}`}</p>
                    <p className='cart-text'>
                        <Link to={`inventarios/edit/${inventario._id}`} >Ver Más...</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
