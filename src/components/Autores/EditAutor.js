/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AutoresService from "../../services/AutoresService.js";
import { Link } from 'react-router-dom';
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faTimes} from '@fortawesome/free-solid-svg-icons';

const EditAutor = () => {
  let history = useHistory();
  const { id } = useParams();
  const [autor, setAutor] = useState({
     nombre: "",
     apellido: "",
     biografia: "",
  });

  const { nombre, apellido, biografia } = autor;
  const onInputChange = e => {
    setAutor({ ...autor, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadAutor();
  },[]);

  const onSubmit = async e => {
    e.preventDefault();
    await AutoresService.update(id,autor)
    history.push("/autores");
  };

  const loadAutor = async () => {
    await AutoresService.getAutor(id).then(result => setAutor(result.data));
  };
  
  return (
    <div className="py-4">
    <Card className={"border border-dark bg-dark text-white"}>
                  <Card.Header style={{"textAlign":"center"}}>
                  <strong>EDITAR AUTOR</strong>
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


export default EditAutor