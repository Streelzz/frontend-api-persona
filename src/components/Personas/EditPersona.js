/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
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
    setPersona({...persona,domicilio:{...domicilio,localidad:{id:e.target.value}} });
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
    <div className="container">
        <div className="py-4">
      <div className="w-100 mx-auto shadow p-5">
        <h4 className="text-center mb-4">EDITAR PERSONA</h4>
        <form>
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
            <Link class="btn btn-danger btn-sm mr-4 text-center" to={`/personas/detalle/${id}`}>CANCELAR</Link>
            <Link class="btn btn-primary btn-sm mr-4" onClick={e => onSubmit(e)}>ACTUALIZAR</Link>
        </div>
        </form>
      </div>
   

       </div>
       </div>

  );
};


export default EditPersona;