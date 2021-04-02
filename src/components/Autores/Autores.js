import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AutoresService from '../../services/AutoresService.js'
import {Card, Table, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faEye,faPlusSquare} from '@fortawesome/free-solid-svg-icons';
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
  
      <Card className="border border-dark bg-dark text-white w-auto">
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /><strong> Lista de Autores</strong>
                        </div>
                        <div style={{"float":"right"}}>
                        <Link to="/autores/add" className="btn btn-sm btn-primary mr-2"><FontAwesomeIcon icon={faPlusSquare} /> Agregar</Link>
                        </div>                   
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>#</th>
                                  <th>NOMBRE</th>
                                  <th>APELLIDO</th>
                                  <th>ACCIONES</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    autores.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No hay autores.</td>
                                    </tr> :
                                    autores.map((autor,index) => (
                                    <tr key={autor.id}>
                                        <td>{index + 1}</td>
                                        <td>{autor.nombre}</td>
                                        <td>{autor.apellido}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={`/autores/detalle/${autor.id}`} className="btn btn-sm btn-primary mr-2"><FontAwesomeIcon icon={faEye} /></Link>                                            
                                                <Link to={`/autores/edit/${autor.id}`} className="btn btn-sm btn-warning mr-2"><FontAwesomeIcon icon={faEdit} /></Link>
                                                <Link class="btn btn-danger btn-sm" onClick={() => deleteAutor(autor.id)}><FontAwesomeIcon icon={faTrash} /></Link>
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

export default Autores;