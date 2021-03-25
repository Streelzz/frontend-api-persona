import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
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
    <div className="container py-4">
      <div className="w-100 mx-auto shadow p-5">
        <h4 className="text-center mb-4">CREAR AUTOR</h4>
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
                    <label for="biografia" class="col-form-label">Biografia: </label>
                  </div>
                  <div class="col-auto w-100">
                  <textarea 
                          className="form-control form-control" 
                          placeholder="Ingrese la biografia" 
                          id="biografia"
                          name="biografia"
                          value={biografia}
                          onChange={e => onInputChange(e)}
                      ></textarea>
                  </div>
            </div>
          <br></br>
          <div class="text-center">
        <Link class="btn btn-danger mr-5 btn-sm" to="/autores">CANCELAR</Link>
        <Link class="btn btn-primary btn-sm" onClick={e => onSubmit(e)}>AGREGAR</Link>
        </div>      
        </form>
      </div>
    </div>
  );
};

export default AddAutor;