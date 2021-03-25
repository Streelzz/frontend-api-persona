/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AutoresService from '../../services/AutoresService.js'
import { Link } from 'react-router-dom';
const AutorDetalle = () => {
  let history = useHistory();
  const { id } = useParams();
  const [autor, setAutor] = useState({
    nombre: "",
    apellido: "",
    biografia: "",
  });

  useEffect(() => {
    loadAutor();
  },[]);


  const loadAutor = async () => {
    await AutoresService.getAutor(id).then(result => setAutor(result.data));
  };
  
  const deleteAutor = async id => {
    await AutoresService.delete(id);
    history.push("/autores");
  };

  return (
    <div className="container">
        <div className="py-4">
        <h4 className="text-center mb-4">DETALLE AUTOR</h4>
        <br></br>
        <table class="table border shadow table-fit">
        <thead class="thead-dark">
            <tr>
              <th scope="col">NOMBRE</th>
              <th scope="col">APELLIDO</th>
              <th scope="col">BIOGRAFIA</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{autor.nombre}</td>
                <td>{autor.apellido}</td>
                <td>{autor.biografia}</td>
              </tr>
          </tbody>
        </table>
        <br></br>
        <div class="text-center">
                  <Link class="btn btn-secondary btn-sm mr-5" to="/autores/">VOLVER</Link>
                  <Link class="btn btn-warning btn-sm mr-5" to={`/autores/edit/${autor.id}`}>EDITAR</Link>
                  <Link class="btn btn-danger btn-sm" onClick={() => deleteAutor(autor.id)}>ELIMINAR</Link>  
        </div>
        </div>
      </div>
  );
};


export default AutorDetalle