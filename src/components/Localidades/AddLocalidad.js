import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LocalidadesService from "../../services/LocalidadesService";
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
    <div className="container">
      <div className="w-100 mx-auto shadow p-5">
        <h4 className="text-center mb-4">AGREGAR</h4>
        <form >       
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
            <Link class="btn btn-danger mr-5 btn-sm" to="/localidades">CANCELAR</Link>
            <Link class="btn btn-primary btn-sm" onClick={e => onSubmit(e)}>AGREGAR</Link>
        </div>  
        </form>
      </div>
    </div>
  );
};

export default AddLocalidad;