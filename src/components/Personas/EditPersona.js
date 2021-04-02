/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faTimes} from '@fortawesome/free-solid-svg-icons';
import PersonasService from "../../services/PersonasService.js";
import LocalidadesService from "../../services/LocalidadesService";

const EditPersona = () => {
  let history = useHistory();
  const { id } = useParams();
  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    dni:"",
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
        }],
    }]
  });
  const [localidades, setLocalidades] = useState([{
    denominacion:""
  }]);
  const { nombre , apellido, dni, domicilio} = persona;

  useEffect(() => {
    loadLocalidades();
    loadPersona();
  },[]);

  const onInputChange = e => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const onInputChangeDom = e => {
    setPersona({...persona,domicilio:{...domicilio,[e.target.name]:e.target.value} });
  }
  const onInputChangeLoc = e => {
    if(e.target.value>=0){
    setPersona({...persona,domicilio:{...domicilio,localidad:{id:e.target.value}} });
  }
    
  }
  const loadPersona = async () => {
    await PersonasService.getPersona(id).then(result => {setPersona(result.data)});
  };
  const loadLocalidades = async () => {
    await LocalidadesService.getLocalidades().then(result => {setLocalidades(result.data)});
  };
 
  const onSubmit = async e => {
      e.preventDefault();
      await PersonasService.update(id,persona);
      history.push(`/personas/detalle/${persona.id}`);
  }


  return (
    <div className="py-4">
      <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header style={{"textAlign":"center"}}>
                    <strong>EDITAR PERSONA</strong>
                    </Card.Header>
                    <Form onSubmit={e => onSubmit(e)}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="nombre"
                                        value={nombre} onChange={e => onInputChange(e)}
                                        className= {"bg-dark text-white"}
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
                                  <Form.Group  as={Col} controlId="formGridDNI">
                                  <Form.Label>DNI</Form.Label>
                                  <Form.Control required autoComplete="off"
                                        type="text" name="dni"
                                        value={dni} onChange={e => onInputChange(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese DNI" />
                                </Form.Group>
                          </Form.Row>
                          <Form.Row>
                            <Form.Label>DOMICILIO</Form.Label>
                            </Form.Row> 
                          <Form.Row>                         
                                  <Form.Group  as={Col} controlId="formGridCalle">
                                  <Form.Label>Calle:</Form.Label>
                                  <Form.Control required autoComplete="off"
                                        type="text" name="calle"
                                        value={domicilio.calle} onChange={e => onInputChangeDom(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese calle" />
                                </Form.Group>
                          </Form.Row> 
                          <Form.Row>                         
                                  <Form.Group  as={Col} controlId="formGridNumero">
                                  <Form.Label>Numero:</Form.Label>
                                  <Form.Control required autoComplete="off"
                                        type="text" name="numero"
                                        value={domicilio.numero} onChange={e => onInputChangeDom(e)}
                                        className={"bg-dark text-white"}
                                        placeholder="Ingrese numero" />
                                </Form.Group>
                          </Form.Row>
                          <Form.Row> 
                          <Form.Group controlId="selectLocalidad">
                                  <Form.Label>Localidad:</Form.Label>
                                  <Form.Control required autoComplete="off" as="select"
                                  name="localidades" onChange={e => onInputChangeLoc(e)} 
                                  className={"bg-dark text-white"}>
                                      <option selected >Seleccione la localidad</option>                    
                                      {localidades.map((localidad) => (
                                      <option value={localidad.id} selected={(localidad.id === persona.domicilio.localidad.id) ? true:false}>{localidad.denominacion}</option>
                                      ))} 
                                  </Form.Control>
                                </Form.Group>
                        </Form.Row>                                           
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


export default EditPersona;