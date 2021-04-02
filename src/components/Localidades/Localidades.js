import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LocalidadesService from '../../services/LocalidadesService.js'
import {Card, Table, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash,faPlusSquare} from '@fortawesome/free-solid-svg-icons';
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
      <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> <strong>Lista de Localidades</strong>
                        </div>
                        <div style={{"float":"right"}}>
                        <Link to="localidades/add" className="btn btn-sm btn-primary mr-2"><FontAwesomeIcon icon={faPlusSquare} /> Agregar</Link>
                        </div>                   
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>#</th>
                                  <th>DENOMINACION</th>
                                  <th>ACCIONES</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    localidades.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No hay localidades.</td>
                                    </tr> :
                                    localidades.map((localidad,index) => (
                                    <tr key={localidad.id}>
                                        <td>{index + 1}</td>
                                        <td>{localidad.denominacion}</td>
                                        <td>
                                            <ButtonGroup>                                              
                                                <Link to={`/localidades/edit/${localidad.id}`} className="btn btn-sm btn-warning mr-2"><FontAwesomeIcon icon={faEdit}/></Link>
                                                <Link class="btn btn-danger btn-sm" onClick={() => deleteLocalidad(localidad.id)}><FontAwesomeIcon icon={faTrash}/></Link>
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

export default Local;