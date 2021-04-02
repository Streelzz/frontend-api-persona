/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import {Card,Table, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEdit, faTrash, faFastBackward, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
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
    <div className="py-4">
        <div >
        <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"textAlign":"center"}}>
                        <strong> DETALLE PERSONA</strong>
                        </div>                   
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th scope="col">NOMBRE</th>
                                    <th scope="col">APELLIDO</th>
                                    <th scope="col">DNI</th>
                                    <th scope="col">DOMICILIO</th>
                                    <th scope="col">LOCALIDAD</th>
                                </tr>
                              </thead>
                              <tbody>              
                                    <td>{persona.nombre}</td>
                                    <td>{persona.apellido}</td>
                                    <td>{persona.dni}</td>
                                    <td>{persona.domicilio.calle} {persona.domicilio.numero}</td>
                                    <td>{persona.domicilio.localidad.denominacion}</td>
                              </tbody>
                        </Table>
                          </Card.Body>                
                </Card>
        </div>
        <br></br>
        <div>
        <Card className="border border-dark bg-dark text-white">
        <Card.Header>
                        <div style= {{"float":"left"}}>
                          <strong>LIBROS</strong>
                        </div>  
                        <div style={{"float":"right"}}>
                        <Link to={`/personas/add/libro/add/${persona.id}`} className="btn btn-sm btn-primary mr-2"><FontAwesomeIcon icon={faPlusSquare} /> AGREGAR LIBRO</Link>
                        </div>                     
        </Card.Header>
        <Card.Body>
            <Table bordered hover striped variant="dark">
                  <thead class="thead-dark">
                      <tr>
                        <th scope="col">TITULO</th>
                        <th scope="col">FECHA</th>
                        <th scope="col">GENERO</th>
                        <th scope="col">PAGINAS</th>
                        <th scope="col">AUTORES</th>
                        <th scope="col">ACCIONES</th>
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
                                <div>{autor.nombre} {autor.apellido}</div>
                            ))}
                        </td>
                        <td>
                        <ButtonGroup>
                            <Link class="btn btn-primary btn-sm mr-2" to={`/personas/detalle/libro/detalle/${persona.id}/${libro.id}`}><FontAwesomeIcon icon={faEye} /></Link>
                            <Link class="btn btn-warning btn-sm mr-2" to={`/personas/libro/edit/${persona.id}/${libro.id}`}><FontAwesomeIcon icon={faEdit}/></Link>
                            <Link class="btn btn-danger btn-sm" onClick={() => deleteLibro(libro.id)}><FontAwesomeIcon icon={faTrash}/></Link>
                        </ButtonGroup>
                        </td>
                      </tr>
                      ))}
                  </tbody>
            </Table> 
        </Card.Body>               
        </Card>
        <br>
        </br>
        
        </div>
        <div style={{"textAlign":"center"}}>
        <ButtonGroup>
                      <Link class="btn btn-secondary btn-sm mr-3" to="/personas/"><FontAwesomeIcon icon={faFastBackward}/> VOLVER</Link>
                      <Link class="btn btn-warning btn-sm mr-3" to={`/personas/edit/${persona.id}`}><FontAwesomeIcon icon={faEdit}/> EDITAR</Link>
                      <Link class="btn btn-danger btn-sm" onClick={() => deletePersona(persona.id)}><FontAwesomeIcon icon={faTrash}/> ELIMINAR</Link>  
         </ButtonGroup>
        </div>
      </div>
  );
};


export default PersonaDetalle