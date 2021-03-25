import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LibrosService from "../../services/LibrosService";

const AutoresLibro = () => {

  const { id,idp } = useParams();

  const [libro, setLibro] = useState({
      autores:[],
  });

  useEffect(() => {
    loadLibro(id);
  }, [id]);

  const loadLibro = async (id) => {
    await LibrosService.getLibro(id).then(result => setLibro(result.data));
  };
  
  return (
    <div className="container">
    <div className="py-4">
    <h4 className="text-center">LIBRO</h4>
        <br></br>
        <table class="table border shadow table-fit">
        <thead class="thead-dark">
            <tr>
              <th scope="col">TITULO</th>
              <th scope="col">FECHA</th>
              <th scope="col">GENERO</th>
              <th scope="col">PAGINAS</th>
            </tr>
          </thead>        
          <tbody>        
              <tr>
                <td>{libro.titulo}</td>
                <td>{libro.fecha}</td>
                <td>{libro.genero}</td>
                <td>{libro.paginas}</td>
              </tr>     
          </tbody>
        </table>
      <div className="py-4">
        <h4 class="text-center">AUTORES</h4>
            <hr></hr>
        <table class="table border shadow table-fit">
          <thead class="thead-dark">
            <tr>
              <th scope="col">NOMBRE</th>
              <th scope="col">APELLIDO</th>
            </tr>
          </thead>
          <tbody>
          {libro.autores.map(autor => (
              <tr>
                <td>{autor.nombre}</td>
                <td>{autor.apellido}</td>
              </tr>
        ))}
          </tbody>
        </table>
        <br></br>
        <div class="text-center">
            <Link class="btn btn-secondary btn-sm mr-5" to={`/personas/detalle/${idp}`}>VOLVER</Link>
            <Link class="btn btn-warning btn-sm mr-5" to={`/personas/libro/edit/${idp}/${id}`}>EDITAR</Link>
            <Link class="btn btn-danger btn-sm tex-center">ELIMINAR</Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AutoresLibro;