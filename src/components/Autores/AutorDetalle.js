/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AutoresService from '../../services/AutoresService.js'
import { Link } from 'react-router-dom';
import {Card, Table,ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faFastBackward} from '@fortawesome/free-solid-svg-icons';

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
  
        <div className="py-4">
        <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"textAlign":"center"}}>
                        <strong>DETALLE AUTOR</strong>
                        </div>                   
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>NOMBRE</th>
                                  <th>APELLIDO</th>
                                </tr>
                              </thead>
                              <tbody>              
                                        <td>{autor.nombre}</td>
                                        <td>{autor.apellido}</td>
                              </tbody>
                        </Table>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>BIOGRAFIA</th>
                                </tr>
                              </thead>
                              <tbody>             
                                  <td>{autor.biografia}</td>
                              </tbody>
                        </Table>                
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"center"}}>
                    <ButtonGroup>
                      <Link class="btn btn-secondary btn-sm mr-3" to="/autores/"><FontAwesomeIcon icon={faFastBackward}/> VOLVER</Link>
                      <Link class="btn btn-warning btn-sm mr-3" to={`/autores/edit/${autor.id}`}><FontAwesomeIcon icon={faEdit}/> EDITAR</Link>
                      <Link class="btn btn-danger btn-sm" onClick={() => deleteAutor(autor.id)}><FontAwesomeIcon icon={faTrash}/> ELIMINAR</Link>  
                    </ButtonGroup>
                    </Card.Footer>
                </Card>
      </div>
  );
};


export default AutorDetalle