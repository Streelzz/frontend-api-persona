import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LocalidadesService from '../../services/LocalidadesService.js'

const Local = () => {
  const [localidades, setLocalidad] = useState([]);

  useEffect(() => {
    loadLocalidades();
  }, []);

  const loadLocalidades = () => {
    LocalidadesService.getLocalidades().then(result => setLocalidad(result.data));
    
  };

  const deleteLocalidad = async id => {
    await LocalidadesService.delete(id);
    loadLocalidades();
  };

  return (
    <div className="container">
      <div className="py-4">
      <h4 class="text-center">LISTA DE LOCALIDADES</h4>
            <div class="left-align"><Link class="btn btn-primary btn-sm" to="/localidades/add">AGREGAR</Link></div>
            <br></br>
        <table class="table border shadow table-fit">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Denominacion</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {localidades.map((localidad, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{localidad.denominacion}</td>
                <td>
                  <Link
                    class="btn btn-warning btn-sm mr-2"
                    to={`/localidades/edit/${localidad.id}`}
                  >
                    EDITAR
                  </Link>
                  <Link
                    class="btn btn-danger btn-sm"
                    onClick={() => deleteLocalidad(localidad.id)}
                  >
                    ELIMINAR
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Local;