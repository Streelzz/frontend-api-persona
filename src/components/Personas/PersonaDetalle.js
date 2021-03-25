/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import PersonasService from "../../services/PersonasService.js";

const PersonaDetalle = () => {
  let history = useHistory();
  const { id } = useParams();
  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    domicilio: {
        calle:"",
        numero:"",
        localidad:{
            id:"",
            denominacion:""
        }
    },
    libros:[{
        titulo:"",
        fecha:"",
        genero:"",
        paginas:"",
        autores:[{
            id:"",
            nombre:"",
            apellido:"",
            biografia:""
        }],
    }]
  });

  useEffect(() => {
    loadPersona();
  },[]);

  const loadPersona = async () => {
    await PersonasService.getPersona(id).then(result => setPersona(result.data));
  };
  
  const deletePersona = async id => {
    await PersonasService.delete(id);
    history.push("/personas");
  };
  const deleteLibro = async idLibro => { 
    const index = persona.libros.findIndex((libro) => {
         return( libro.id === idLibro);
     })
     persona.libros.splice(index,1);
     setPersona(persona)
     console.log(persona)
     await PersonasService.update(id,persona);
   };
  return (
    <div className="container">
        <div className="py-4">
        <h3 className="text-center mb-4">DETALLE PERSONA</h3>
        <br></br>
        <h4 className="text-left mb-4">DATOS PERSONALES</h4>
        <table class="table border shadow">
        <thead class="thead-dark">
            <tr>
              <th scope="col">NOMBRE</th>
              <th scope="col">APELLIDO</th>
              <th scope="col">DNI</th>
              <th scope="col">DOMICILIO</th>
              <th scope="col">LOCALIDAD</th>
            </tr>
          </thead>
          <tbody>             
              <tr>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                <td>{persona.dni}</td>
                <td>{persona.domicilio.calle} {persona.domicilio.numero}</td>
                <td>{persona.domicilio.localidad.denominacion}</td>
              </tr>
          </tbody>
        </table>
        <br></br>
        <td><h4 className="text-left mr-3">LIBROS</h4></td>
        <td><Link class="btn btn-primary btn-sm" to={`/personas/add/libro/add/${persona.id}`}>AGREGAR LIBRO</Link>  </td>   
        <br></br>
        
        <table class="table border shadow">
        <thead class="thead-dark">
            <tr>
              <th scope="col">TITULO</th>
              <th scope="col">FECHA</th>
              <th scope="col">GENERO</th>
              <th scope="col">PAGINAS</th>
              <th scope="col">AUTORES</th>
              <th scope="col">ACCION</th>
            </tr>
          </thead>        
          <tbody>
            {persona.libros.map((libro) => (
              <tr>
                <td>{libro.titulo}</td>
                <td>{libro.fecha}</td>
                <td>{libro.genero}</td>
                <td>{libro.paginas}</td>
                <td>
                    {libro.autores.map((autor) => (
                        <tr>{autor.nombre} {autor.apellido}</tr>
                    ))}
                </td>
                <td>
                    <Link class="btn btn-primary btn-sm mr-5" to={`/personas/detalle/libro/detalle/${persona.id}/${libro.id}`}>DETALLE</Link>
                    <Link class="btn btn-danger btn-sm" onClick={() => deleteLibro(libro.id)}>ELIMINAR</Link>
                </td>
              </tr>
              ))}
          </tbody>
        </table>
        <br></br>
        <br></br>
        <div class="text-center">           
            <Link class="btn btn-secondary btn-sm mr-5" to={`/personas`}>VOLVER</Link>
            <Link class="btn btn-warning btn-sm mr-5" to={`/personas/edit/${persona.id}`}>EDITAR</Link>
            <Link class="btn btn-danger btn-sm" onClick={() => deletePersona(persona.id)}>ELIMINAR</Link>
        </div>
        </div>
      </div>
  );
};


export default PersonaDetalle