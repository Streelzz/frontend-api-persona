import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LocalidadesService from "../../services/LocalidadesService";
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faTimes} from '@fortawesome/free-solid-svg-icons';

const AddLocalidad = () => {
  let history = useHistory();
  const [localidad, setUser] = useState({
    denominacion: "",
  });

  const { denominacion } = localidad;
  const onInputChange = e => {
    setUser({ ...localidad, [e.target.name]: e.target.value });  
  };

  const onSubmit = async e => {
    e.preventDefault();
    await LocalidadesService.save(localidad);
    history.push("/localidades");
  };
  return (
    <div className="py-4">
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header style={{"textAlign":"center"}}>
                         AGREGAR LOCALIDAD
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
                            <Button Button size="sm" variant="primary" type="submit"><FontAwesomeIcon icon={faSave}/> AGREGAR</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>

  );
};

export default AddLocalidad;