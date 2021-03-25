/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import LocalidadesService from '../../services/LocalidadesService.js'
import { Link } from 'react-router-dom';

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
    <div className="container">
      <div className="w-100 mx-auto shadow p-5">
        <h4 className="text-center mb-4">EDITAR LOCALIDAD</h4>
        <form>
          <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="denominacion" class="col-form-label">Denominacion: </label>
              </div>
              <div class="col-auto">
                  <input
                      type="text"
                      className="form-control form-control"
                      placeholder="Ingrese la denominacion"
                      id="denominacion"
                      name="denominacion"
                      value={denominacion}
                      onChange={e => onInputChange(e)}
                    />
              </div>
          </div>
          <br></br>
          <div class="text-center">
          <Link class="btn btn-danger mr-5 text-center btn-sm" to="/localidades">CANCELAR</Link>
          <Link class="btn btn-primary btn-sm" onClick={e => onSubmit(e)}>ACTUALIZAR</Link>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditLocalidad