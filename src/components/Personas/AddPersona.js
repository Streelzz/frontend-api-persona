import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import PersonasService from "../../services/PersonasService.js";
import LocalidadesService from "../../services/LocalidadesService";

const AddPersona = () => {
  let history = useHistory();
 
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
    libros:[]
  });
  const [localidades, setLocalidades] = useState([{
    denominacion:""
  }]);
  const { nombre , apellido, dni, domicilio} = persona;

  useEffect(() => {
    loadLocalidades();
  },[]);

  const onInputChange = e => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const onInputChangeDom = e => {
    setPersona({...persona,domicilio:{...domicilio,[e.target.name]:e.target.value} });
  }
  const onInputChangeLoc = e => {
    setPersona({...persona,domicilio:{...domicilio,localidad:{id:e.target.value}} });
  }

  const loadLocalidades = async () => {
    await LocalidadesService.getLocalidades().then(result => {setLocalidades(result.data)});
  };


  const onSubmit = async e => {
      e.preventDefault();
      await PersonasService.save(persona);
      history.push("/personas");
  }


  return (
  
      <div className="container py-4">
      <div className="w-125 mx-auto shadow p-4 ">
        <h4 className="text-center mb-4">AGREGAR PERSONA</h4>
        <form class="form-group form-group">
        <div class="row g-3 align-items-center form-group">
                  <div class="col-auto">
                    <label for="nombre" class="col-form-label">Nombre: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese el nombre"
                          id="nombre"
                          name="nombre"
                          value={nombre}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
          </div>
          <div class="row g-3 align-items-center form-group">
                  <div class="col-auto">
                    <label for="apellido" class="col-form-label">Apellido: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese el apellido"
                          id="apellido"
                          name="apellido"
                          value={apellido}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
            </div>
            <div class="row g-3 align-items-center form-group">
                  <div class="col-auto">
                    <label for="dni" class="col-form-label">DNI:</label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese el dni"
                          id="dni"
                          name="dni"
                          value={dni}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
            </div>
                  <div>
                    <label class="col-form-label"><strong>DOMICILIO</strong></label>
                  </div>
            <div class="row g-3 align-items-center form-group ">
                  <div class="col-auto">
                    <label for="calle" class="col-form-label">Calle: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese la calle"
                          id="calle"
                          name="calle"
                          value={domicilio.calle}
                          onChange={e => onInputChangeDom(e)}
                        />
                  </div>
            </div>
            <div class="row g-3 align-items-center form-group">
                  <div class="col-auto">
                    <label for="numero" class="col-form-label">Numero: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese el numero"
                          id="numero"
                          name="numero"
                          value={domicilio.numero}
                          onChange={e => onInputChangeDom(e)}
                        />
                  </div>
            </div>
            <div class="row g-3 align-items-center form-group">
                  <div class="col-auto">
                    <label  class="col-form-label">Localidad: </label>
                  </div>
                  <div class="col-auto">
                  <select class="form-control form-control" name="localidades" onChange={e => onInputChangeLoc(e)}>    
                          <option selected >Seleccione la localidad</option>                    
                          {localidades.map((localidad) => (
                          <option value={localidad.id} selected={(localidad.id === persona.domicilio.localidad.id) ? true:false}>{localidad.denominacion}</option>
                          ))}
                </select>
              </div>
            </div>         
          <br></br>
          <div class="text-center">     
          <Link class="btn btn-danger btn-sm mr-5" to="/personas/">CANCELAR</Link>      
          <Link class="btn btn-primary btn-sm" onClick={e => onSubmit(e)}>AGREGAR</Link>
        </div>
        </form>
      </div>
    </div>

  );
};


export default AddPersona;