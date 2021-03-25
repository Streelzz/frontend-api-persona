import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AutoresService from "../../services/AutoresService";
import PersonasService from "../../services/PersonasService.js";

const AddLibro = () => {

  const { id } = useParams();
  let history = useHistory();
  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
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
        }]
    }]
  });

const [libro, setLibro] = useState({
    autores:[],
});
  const [autoresList, setAutores] = useState([{}]);
  const {titulo , fecha, paginas, genero,autores} = libro;

  const onInputChange = async e => {
    setLibro({ ...libro, [e.target.name]: e.target.value });
    console.log(persona)
  };

  const onInputChangeAutores = e => {
    const idA=parseInt(e.target.value);
    const index = autoresList.findIndex((autor) => {
        return( autor.id === idA);
    })
    autores.push(autoresList[index]);
    setPersona({...persona,persona})
  };

  useEffect(() => {
    loadPersona();
    loadAutores();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  const loadAutores = async () => {
    await AutoresService.getAutores().then(result => setAutores(result.data));
  };

  const loadPersona = async () => {
    await PersonasService.getPersona(id).then(result => setPersona(result.data));
  };


  const deleteAutor =  id => { 
   const index = autores.findIndex((autor) => {
        return( autor.id === id);
    })
    autores.splice(index,1);
    setLibro({...libro,libro});
  };

  const onSubmit = async e => {
    e.preventDefault();
    persona.libros.push(libro)
    await PersonasService.update(id,persona);
    history.push(`/personas/detalle/${persona.id}`);
}

  
  return (
    <div className="container">
      <div className="container py-4">
        <h3 className="text-center mb-4">AGREGAR LIBRO</h3>
        <h4 class="text-left">DATOS LIBRO</h4>
        <form>
        <div class="row g-3 align-items-center form-group">
                  <div class="col-auto">
                    <label for="titulo" class="col-form-label">Titulo: </label>
                  </div>
                  <div class="col-auto">
                      <input
                          type="text"
                          className="form-control form-control"
                          placeholder="Ingrese el titulo"
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
                          placeholder="Ingrese año publicacion"
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
                          placeholder="Ingrese el genero"
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
                          placeholder="Ingrese n° de paginas"
                          id="paginas"
                          name="paginas"
                          value={paginas}
                          onChange={e => onInputChange(e)}
                        />
                  </div>
            </div>
          <br></br>
          <h4 class="text-left">AUTORES</h4>
          <div className="form-group">
                <td>
                <select class="form-control form-control" name="autores" onChange={(e) => onInputChangeAutores(e)}>
                              <option selected>AGREGAR AUTOR</option>
                              {autoresList.map((autor) => (                                                  
                              <option value={autor.id}>{autor.nombre} {autor.apellido}</option>                       
                              ))}                          
                </select>
                </td>
          </div>

        <table class="table border shadow table-fit">
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
            <Link class="btn btn-danger btn-sm mr-5" to={`/personas/detalle/${persona.id}`}>CANCELAR</Link>
            <Link class="btn btn-primary btn-sm mr-5" onClick={e => onSubmit(e)}>ACEPTAR</Link>
        </div>
        </form>  
      </div>
    </div>
  );
};

export default AddLibro;