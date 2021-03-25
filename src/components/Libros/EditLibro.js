import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import LibrosService from "../../services/LibrosService";
import AutoresService from "../../services/AutoresService";

const EditLibro = () => {

  const { idp, id } = useParams();
  let history = useHistory();
  const [libro, setLibro] = useState({
      autores:[],
  });
  const [autoresList, setAutores] = useState([{}]);

  const {titulo , fecha, paginas, genero,autores} = libro;
 
  const onInputChange = async e => {
    setLibro({ ...libro, [e.target.name]: e.target.value });
  };

  const onInputChangeAutores = e => {
    const idA=parseInt(e.target.value);
    const index = autoresList.findIndex((autor) => {

        return( autor.id === idA);
    })

    libro.autores.push(autoresList[index]);
    setLibro({...libro,libro});
  };

  useEffect(() => {
    loadLibro(id);
    loadAutores();
  }, [id]);
  
  const loadLibro = async (id) => {
    await LibrosService.getLibro(id).then(result => setLibro(result.data));
  };

  const loadAutores = async () => {
    await AutoresService.getAutores().then(result => setAutores(result.data));
  };

  const deleteAutor =  id => { 
   const index = autores.findIndex((autor) => {
        return( autor.id === id);
    })
    libro.autores.splice(index,1);
    setLibro({...libro,libro});
  };

  const onSubmit = async e => {
    e.preventDefault();
    await LibrosService.update(id,libro)
    history.push(`/personas/detalle/libro/detalle/${idp}/${id}`);
  };
  
  return (
    <div className="container">
      <div className="container py-4">
        <h4 className="text-center mb-4">EDITAR LIBRO</h4>
        <form>
        <div class="row g-3 align-items-center form-group">
                  <div class="col-auto">
                    <label for="titulo" class="col-form-label">Titulo: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese el nombre"
                          id="titulo"
                          name="titulo"
                          value={titulo}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
            </div>
            <div class="row g-3 align-items-center form-group">
                  <div class="col-auto">
                    <label for="fecha" class="col-form-label">Fecha: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese el nombre"
                          id="fecha"
                          name="fecha"
                          value={fecha}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
            </div>
            <div class="row g-3 align-items-center form-group">
                  <div class="col-auto">
                    <label for="genero" class="col-form-label">Genero: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese el nombre"
                          id="genero"
                          name="genero"
                          value={genero}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
            </div>
            <div class="row g-3 align-items-centerform-group">
                  <div class="col-auto">
                    <label for="paginas" class="col-form-label">Paginas: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese el nombre"
                          id="paginas"
                          name="paginas"
                          value={paginas}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
            </div>
          <br></br>
          <h4 class="text-center">AUTORES</h4>
          <br></br>
          <div className="form-group">
                <td>
                <select class="form-control form-control" name="autores" onChange={(e) => onInputChangeAutores(e)}>
                              <option selected>AGREGAR AUTOR</option>
                              {autoresList.map((autor) => (                                                  
                              <option value={autor.id}>{autor.nombre} {autor.apellido}</option>                       
                              ))}                          
                </select>
                </td>
                <td>
                
                </td>
          </div>

        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">NOMBRE</th>
              <th scope="col">APELLIDO</th>
              <th scope="col">ACCION</th>
            </tr>
          </thead>
          <tbody>
              {libro.autores.map(autor => (
                  <tr>
                    <td>{autor.nombre}</td>
                    <td>{autor.apellido}</td>
                    <td>
                    <Link
                        class="btn btn-danger btn-sm" onClick={() => deleteAutor(autor.id)}>
                        ELIMINAR
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <br></br>
          <div class="text-center">           
            <Link class="btn btn-secondary btn-sm mr-5" to={`/personas/detalle/libro/detalle/${idp}/${id}`}>CANCELAR</Link>
            <Link class="btn btn-primary btn-sm mr-5" onClick={e => onSubmit(e)}>ACTUALIZAR</Link>
        </div>
        </form>  
      </div>
    </div>
  );
};

export default EditLibro;