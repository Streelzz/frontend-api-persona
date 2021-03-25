/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AutoresService from "../../services/AutoresService.js";
import { Link } from 'react-router-dom';

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
    <div className="container">
      <div className="w-100 mx-auto shadow p-5">
        <h4 className="text-center mb-4">EDITAR AUTOR</h4>
        <form>
          <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <label for="nombre" class="col-form-label-lg">Nombre: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Ingrese el nombre"
                          id="nombre"
                          name="nombre"
                          value={nombre}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
            </div>
            <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <label for="apellido" class="col-form-label-lg">Apellido: </label>
                  </div>
                  <div class="col-auto">
                  <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Ingrese el apellido"
                          id="apellido"
                          name="apellido"
                          value={apellido}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
            </div>
            <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <label for="biografia" class="col-form-label-lg">Biografia: </label>
                  </div>
                  <div class="col-auto w-100">
                  <textarea 
                          className="form-control form-control-lg" 
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
          <Link class="btn btn-danger mr-5 btn-sm text-center" to={`/autores/detalle/${autor.id}`}>CANCELAR</Link>
          <Link class="btn btn-primary btn-sm" onClick={e => onSubmit(e)}>ACTUALIZAR</Link>
          </div>
        </form>
      </div>
    </div>

  );
};


export default EditAutor