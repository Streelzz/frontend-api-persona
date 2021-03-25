import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AutoresService from '../../services/AutoresService.js'

const Autores = () => {
  const [autores, setAutor] = useState([]);

  useEffect(() => {
    loadAutores();
  }, []);

  const loadAutores = async () => {
    await AutoresService.getAutores().then(result => setAutor(result.data));
  };

  const deleteAutor = async id => {
    await AutoresService.delete(id);
    loadAutores();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h4 class="text-center">LISTA DE AUTORES</h4>
        <div class="left-align"><Link class="btn btn-primary btn-sm" to="/autores/add">AGREGAR</Link></div>
            <br></br>
        <table class="table border shadow table-fit">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">APELLIDO</th>
              <th scope="col">ACCION</th>
            </tr>
          </thead>
          <tbody>
            {autores.map((autor, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{autor.nombre}</td>
                <td>{autor.apellido}</td>
                <td>
                  <Link class="btn btn-primary btn-sm mr-2" to={`/autores/detalle/${autor.id}`}>
                    DETALLE
                  </Link>
                  <Link
                    class="btn btn-warning btn-sm mr-2"
                    to={`/autores/edit/${autor.id}`}>
                    EDITAR
                  </Link>
                  <Link
                    class="btn btn-danger btn-sm"
                    onClick={() => deleteAutor(autor.id)}>
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

export default Autores;