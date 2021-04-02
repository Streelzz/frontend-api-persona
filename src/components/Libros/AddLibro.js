import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {Card, Form, Button, Col,Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faTimes} from '@fortawesome/free-solid-svg-icons';
import AutoresService from "../../services/AutoresService";
import PersonasService from "../../services/PersonasService.js";

const AddLibro = () => {

  const { id } = useParams();
  let history = useHistory();
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
        }]
    }]
  });

const [libro, setLibro] = useState({
    autores:[],
});
  const [autoresList, setAutores] = useState([{}]);
  const {titulo , fecha, paginas, genero,autores} = libro;

  const onInputChange = async e => {
    setLibro({ ...libro, [e.target.name]: e.target.value });
    console.log(persona)
  };

  const onInputChangeAutores = e => {
    const idA=parseInt(e.target.value);
    const index = autoresList.findIndex((autor) => {
        return( autor.id === idA);
    })
    autores.push(autoresList[index]);
    setPersona({...persona,persona})
  };

  useEffect(() => {
    loadPersona();
    loadAutores();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  const loadAutores = async () => {
    await AutoresService.getAutores().then(result => setAutores(result.data));
  };

  const loadPersona = async () => {
    await PersonasService.getPersona(id).then(result => setPersona(result.data));
  };


  const deleteAutor =  id => { 
   const index = autores.findIndex((autor) => {
        return( autor.id === id);
    })
    autores.splice(index,1);
    setLibro({...libro,libro});
  };

  const onSubmit = async e => {
    e.preventDefault();
    persona.libros.push(libro)
    await PersonasService.update(id,persona);
    history.push(`/personas/detalle/${persona.id}`);
}

  
  return (

      <div className="py-4">
      <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header style={{"textAlign":"center"}}>
                         AGREGAR LIBRO
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
                          <thead class="thead-dark">
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
                                        <td>
                                        <Link
                                            class="btn btn-danger btn-sm" onClick={() => deleteAutor(autor.id)}>
                                            ELIMINAR
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                              </tbody>     
                          </Table>                                  
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"center"}}>
                          
                            <Link class="btn btn-danger mr-5 btn-sm" to={`/personas/detalle/${persona.id}`}><FontAwesomeIcon icon={faTimes}/> CANCELAR</Link>
                            <Button Button size="sm" variant="primary" type="submit"><FontAwesomeIcon icon={faSave}/> GUARDAR</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>

  );
};

export default AddLibro;