import React, { Component } from 'react';
import {
BrowserRouter as Router,
Switch, 
Route} from "react-router-dom";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import NavBar from "./components/layout/NavBar";
import Info from "./components/Info/Info";
import Personas from "./components/Personas/Personas";
import AddPersona from "./components/Personas/AddPersona";
import EditPersona from "./components/Personas/EditPersona";
import PersonaDetalle from "./components/Personas/PersonaDetalle";
import AutoresLibro from './components/Libros/LibroDetalle';
import Autores from "./components/Autores/Autores";
import EditAutor from './components/Autores/EditAutor';
import AddAutor from "./components/Autores/AddAutor";
import AutorDetalle from "./components/Autores/AutorDetalle";
import Localidades from "./components/Localidades/Localidades";
import EditLocalidad from "./components/Localidades/EditLocalidad";
import AddLocalidad from './components/Localidades/AddLocalidad';
import EditLibro from './components/Libros/EditLibro';
import AddLibro from './components/Libros/AddLibro';

class App extends Component {
  render() {
    return (     
      <Router>
        <div className="App">  
          <NavBar/>  
          <Switch>
            <Route exact path="/info" component={Info} />       
            <Route exact path="/personas" component={Personas} />
            <Route exact path="/personas/add" component={AddPersona} />
            <Route exact path="/personas/add/libro/add/:id" component={AddLibro} />
            <Route exact path="/personas/edit/:id" component={EditPersona} />
            <Route exact path="/personas/detalle/:id" component={PersonaDetalle} />
            <Route exact path="/personas/detalle/libro/detalle/:idp/:id" component={AutoresLibro} />
            <Route exact path="/personas/libro/edit/:idp/:id" component={EditLibro} />
            <Route exact path="/autores" component={Autores} />
            <Route exact path="/autores/add" component={AddAutor} />
            <Route exact path="/autores/edit/:id" component={EditAutor} />
            <Route exact path="/autores/detalle/:id" component={AutorDetalle} />
            <Route exact path="/localidades" component={Localidades} />
            <Route exact path="/localidades/edit/:id" component={EditLocalidad} />
            <Route exact path="/localidades/add" component={AddLocalidad} />
          </Switch>

        </div>
      </Router>
    );
  }
}
export default App;

