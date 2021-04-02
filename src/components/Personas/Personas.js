import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonasService from "../../services/PersonasService.js";
import {Card, Table, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faEye,faPlusSquare} from '@fortawesome/free-solid-svg-icons';

const Personas = () => {
  const [personas, setPersona] = useState([]);

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = async () => {
    await PersonasService.getPersonas().then(result => setPersona(result.data))
  };

  const deletePersona = async id => {
    await PersonasService.delete(id);
    loadPersonas();
  };

  return ( 
    
      <Card  className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"float":"left"}}> 
                            <FontAwesomeIcon icon={faList} /> <strong>Lista de Personas</strong> 
                        </div>
                        <div style={{"float":"right"}}>
                        <Link to="/personas/add" className="btn btn-sm btn-primary mr-2"><FontAwesomeIcon icon={faPlusSquare} /> Agregar</Link>
                        </div>                                     
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>#</th>
                                  <th>NOMBRE</th>
                                  <th>APELLIDO</th>
                                  <th>DOMICILIO</th>
                                  <th>ACCIONES</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    personas.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No hay personas.</td>
                                    </tr> :
                                    personas.map((persona,index) => (
                                    <tr key={persona.id}>
                                        <td>{index + 1}</td>
                                        <td>{persona.nombre}</td>
                                        <td>{persona.apellido}</td>
                                        <td>{persona.domicilio.calle} {persona.domicilio.numero}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={`/personas/detalle/${persona.id}`} className="btn btn-sm btn-primary mr-2"><FontAwesomeIcon icon={faEye} /></Link>                                            
                                                <Link to={`/personas/edit/${persona.id}`} className="btn btn-sm btn-warning mr-2"><FontAwesomeIcon icon={faEdit} /></Link>
                                                <Link class="btn btn-danger btn-sm" onClick={() => deletePersona(persona.id)}><FontAwesomeIcon icon={faTrash} /></Link>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                </Card>
 
  );
};

export default Personas;