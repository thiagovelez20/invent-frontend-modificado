import React, { useEffect, useState } from 'react'
import { getMarcas, crearMarca } from '../../services/marcaService';
import { Link } from 'react-router-dom';

export const MarcaView = () => {
  const [marcas, setMarcas] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;

  const listarMarcas = async () => {
    try {
      const resp = await getMarcas();
      setMarcas(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarMarcas();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value }); //spread
  }
  const handleCrearMarca = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      const resp = await crearMarca(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
      listarMarcas();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearMarca(e)} >
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
            <button className="btn btn-primary">Crear</button>
          </div>
        </div>
        
      </form>

      {/*tabla para listar marcas */}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {
            marcas.map(marca => {
              return <tr>
                <td>{marca.nombre}</td>
                <td>{marca.estado}</td>
                <td>
                  {/*ruta a la pagina de editar usuarios, esta ruta hay que crearla en App.js */}
                   {/*nota usar las comillas invertidas en esta parte del to={``} */}
                   <Link to={`/marcas/edit/${marca._id}`} ><button id="btn_edit">Editar</button></Link> {/*ahora vamos a marcaUpdate e 
                  importamos el hooks useParams que es el nos ayuda a optener los parametros enviados por la url */}
                </td>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  )
}