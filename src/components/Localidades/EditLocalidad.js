/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import LocalidadesService from '../../services/LocalidadesService.js'
import { Link } from 'react-router-dom';
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faTimes} from '@fortawesome/free-solid-svg-icons';

const EditLocalidad = () => {
  let history = useHistory();
  const { id } = useParams();
  const [localidad, setLocalidad] = useState({
    denominacion: "",
  });

  const { denominacion } = localidad;
  const onInputChange = e => {
    setLocalidad({ ...localidad, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadLocalidad();
  },[]);

  const onSubmit = async e => {
    e.preventDefault();
    await LocalidadesService.update(id,localidad);
    history.push("/localidades");
  };

  const loadLocalidad = async () => {
    await LocalidadesService.getLocalidad(id).then(result => setLocalidad(result.data));
  };
  
  return (

      <div className="py-4">
      <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header style={{"textAlign":"center"}}>
                    <strong> EDITAR LOCALIDAD</strong>
                    </Card.Header>
                    <Form onSubmit={e => onSubmit(e)} id="localidad">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDenominacion">
                                    <Form.Label>Denominacion</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="denominacion"
                                        value={denominacion} onChange={e => onInputChange(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese denominacion" />
                                </Form.Group>
                            </Form.Row>                                 
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"center"}}>
                            <Link class="btn btn-danger mr-5 btn-sm" to="/localidades"><FontAwesomeIcon icon={faTimes}/> CANCELAR</Link>
                            <Button Button size="sm" variant="primary" type="submit"><FontAwesomeIcon icon={faSave}/> GUARDAR</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>

   
  );
};


export default EditLocalidad