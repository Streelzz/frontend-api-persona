import React, { useState, useEffect } from "react";
import {Link, useHistory, useParams } from "react-router-dom";
import {Card, Form, Button, Col,Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faTimes,faTrash} from '@fortawesome/free-solid-svg-icons';
import LibrosService from "../../services/LibrosService";
import AutoresService from "../../services/AutoresService";

const EditLibro = () => {

  const { idp, id } = useParams();
  let history = useHistory();
  const [libro, setLibro] = useState({
      autores:[],
  });
  const [autoresList, setAutores] = useState([{}]);

  const {titulo , fecha, paginas, genero,autores} = libro;
 
  const onInputChange = async e => {
    setLibro({ ...libro, [e.target.name]: e.target.value });
  };

  const onInputChangeAutores = e => {
    const idA = parseInt(e.target.value);
    console.log(idA)
    const index = autoresList.findIndex((autor) => {
        return( autor.id === idA);
    })
    const rep = libro.autores.findIndex((autor) => {
      return( autor.id === idA);
  })
  console.log(rep.type , rep)
    if(!isNaN(idA)){
      if(rep<0){
        libro.autores.push(autoresList[index]);
        setLibro({...libro,libro});
      }     
    } 
  };

  useEffect(() => {
    loadLibro(id);
    loadAutores();
  }, [id]);
  
  const loadLibro = async (id) => {
    await LibrosService.getLibro(id).then(result => setLibro(result.data));
  };

  const loadAutores = async () => {
    await AutoresService.getAutores().then(result => setAutores(result.data));
  };

  const deleteAutor =  id => { 
   const index = autores.findIndex((autor) => {
        return( autor.id === id);
    })
    libro.autores.splice(index,1);
    setLibro({...libro,libro});
  };

  const onSubmit = async e => {
    e.preventDefault();
    await LibrosService.update(id,libro)
    history.push(`/personas/detalle/libro/detalle/${idp}/${id}`);
  };
  
  return (
      <div className="py-4">
      <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header style={{"textAlign":"center"}}>
                    <strong>EDITAR LIBRO</strong>
                    </Card.Header>
                    <Form onSubmit={e => onSubmit(e)}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitulo">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="titulo"
                                        value={titulo} onChange={e => onInputChange(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese titulo" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridFecha">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="fecha"
                                        value={fecha} onChange={e => onInputChange(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese año" />
                                </Form.Group>
                            </Form.Row>  
                            <Form.Row>                         
                                  <Form.Group  as={Col} controlId="formGridGenero">
                                  <Form.Label>Genero</Form.Label>
                                  <Form.Control required autoComplete="off"
                                        type="text" name="genero"
                                        value={genero} onChange={e => onInputChange(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese genero" />
                                </Form.Group>
                          </Form.Row> 
                          <Form.Row>                         
                                  <Form.Group  as={Col} controlId="formGridPaginas">
                                  <Form.Label>Paginas</Form.Label>
                                  <Form.Control required autoComplete="off"
                                        type="text" name="paginas"
                                        value={paginas} onChange={e => onInputChange(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese n° de paginas" />
                                </Form.Group>
                          </Form.Row>
                          <Form.Row>
                                <Form.Group controlId="selectLocalidad">
                                        <Form.Label>Autores:</Form.Label>
                                        <Form.Control required autoComplete="off" as="select"
                                        name="autores" onChange={(e) => onInputChangeAutores(e)} 
                                        className={"bg-dark text-white"}>
                                            <option selected>Agregar Autor</option>
                                            {autoresList.map((autor) => (                                                  
                                            <option value={autor.id}>{autor.nombre} {autor.apellido}</option>                       
                                            ))}   
                                        </Form.Control>
                                  </Form.Group>
                          </Form.Row>
                          <Table bordered hover striped variant="dark">
                          <thead class="thead-dark" style={{"textAlign":"left"}}>
                                <tr>
                                  <th scope="col">NOMBRE</th>
                                  <th scope="col">APELLIDO</th>
                                  <th scope="col">ACCION</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {libro.autores.map(autor => (
                                      <tr>
                                        <td>{autor.nombre}</td>
                                        <td>{autor.apellido}</td>
                                        <td style={{"textAlign":"center"}}>
                                        <Link
                                            class="btn btn-danger btn-sm" onClick={() => deleteAutor(autor.id)}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                              </tbody>     
                          </Table>                                  
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"center"}}>
                          
                            <Link class="btn btn-danger mr-5 btn-sm" to={`/personas/detalle/libro/detalle/${idp}/${id}`}><FontAwesomeIcon icon={faTimes}/> CANCELAR</Link>
                            <Button Button size="sm" variant="primary" type="submit"><FontAwesomeIcon icon={faSave}/> GUARDAR</Button>
                        </Card.Footer>
                    </Form>
                </Card>
      </div>
  );
};

export default EditLibro;