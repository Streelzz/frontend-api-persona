/* eslint-disable jsx-a11y/anchor-is-valid */
import {React} from "react";
import { Navbar,Nav } from 'react-bootstrap';
const NavBar = () => {

    return (
    
      <Navbar Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/info">Informacion</Nav.Link>
            <Nav.Link href="/personas">Personas</Nav.Link>
            <Nav.Link href="/autores">Autores</Nav.Link>
            <Nav.Link href="/localidades">Localidades</Nav.Link>
          </Nav>
      </Navbar.Collapse>
    </Navbar>

    );
};

export default NavBar