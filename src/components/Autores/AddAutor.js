import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faTimes} from '@fortawesome/free-solid-svg-icons';
import AutoresService from "../../services/AutoresService";

const AddAutor = () => {
  let history = useHistory();
  const [autor, setAutor] = useState({
    nombre: "",
    apellido: "",
    biografia: "",
  });

  const { nombre, apellido, biografia } = autor;
  const onInputChange = e => {
    setAutor({ ...autor, [e.target.name]: e.target.value });
    
};

  const onSubmit = async e => {
    e.preventDefault();
    await AutoresService.save(autor);
    history.push("/autores");
  };
  return (

      <div className="py-4">
      <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header style={{"textAlign":"center"}}>
                         AGREGAR AUTOR
                    </Card.Header>
                    <Form onSubmit={e => onSubmit(e)}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="nombre"
                                        value={nombre} onChange={e => onInputChange(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese nombre" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="apellido"
                                        value={apellido} onChange={e => onInputChange(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese apellido" />
                                </Form.Group>
                            </Form.Row>  
                            <Form.Row>                         
                                  <Form.Group  as={Col} controlId="formGridBiografia">
                                  <Form.Label>Biografia</Form.Label>
                                  <Form.Control as="textarea" rows={5} required autoComplete="off"
                                        type="textArea" name="biografia"
                                        value={biografia} onChange={e => onInputChange(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese biografia" />
                                </Form.Group>
                          </Form.Row>                                   
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"center"}}>
                            <Link class="btn btn-danger mr-5 btn-sm" to="/autores"><FontAwesomeIcon icon={faTimes}/> CANCELAR</Link>
                            <Button Button size="sm" variant="primary" type="submit"><FontAwesomeIcon icon={faSave}/> GUARDAR</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
  );
};

export default AddAutor;