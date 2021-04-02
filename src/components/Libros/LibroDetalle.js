import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {Card, Table,ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faFastBackward} from '@fortawesome/free-solid-svg-icons';
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
    
    <div className="py-4">
        <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"textAlign":"center"}}>
                        <strong>DETALLE LIBRO</strong>
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
                        </Table>
                          </Card.Body>                
          </Card> 
          <br></br>
          <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"textAlign":"center"}}>
                        <strong>AUTORES</strong>
                        </div>                   
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
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
                        </Table>
                      </Card.Body>
                      <Card.Footer>
                            
                      </Card.Footer>                
          </Card>
          <br></br>
          <div style={{"textAlign":"center"}}>
            <ButtonGroup>
                                <Link class="btn btn-secondary btn-sm mr-5" to={`/personas/detalle/${idp}`}><FontAwesomeIcon icon={faFastBackward}/>VOLVER</Link>
                                <Link class="btn btn-warning btn-sm mr-5" to={`/personas/libro/edit/${idp}/${id}`}><FontAwesomeIcon icon={faEdit}/>EDITAR</Link>
                                <Link class="btn btn-danger btn-sm tex-center"><FontAwesomeIcon icon={faTrash}/> ELIMINAR</Link>
          </ButtonGroup>
            </div>          
    </div>
  );
};

export default AutoresLibro;