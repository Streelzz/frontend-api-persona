import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonasService from "../../services/PersonasService.js";

const Personas = () => {
  const [personas, setPersona] = useState([]);

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = async () => {
    await PersonasService.getPersonas().then(result => setPersona(result.data))
  };

  const deletePersona = async id => {
    await PersonasService.delete(id);
    loadPersonas();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h4 class="text-center">LISTA DE PERSONAS</h4>
        <div class="left-align"><Link class="btn btn-primary btn-sm" to="/personas/add">AGREGAR</Link></div>
            <br></br>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">APELLIDO</th>
              <th scope="col">DOMICILIO</th>
              <th>ACCION</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                <td>{persona.domicilio.calle} {persona.domicilio.numero}</td>
                <td>
                  <Link class="btn btn-primary btn-sm mr-2" to={`/personas/detalle/${persona.id}`}>
                    DETALLE
                  </Link>
                  <Link
                    class="btn btn-warning btn-sm mr-2"
                    to={`/personas/edit/${persona.id}`}>
                    EDITAR
                  </Link>
                  <Link
                    class="btn btn-danger btn-sm"
                    onClick={() => deletePersona(persona.id)}>
                    ELIMINAR
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Personas;