/* eslint-disable jsx-a11y/alt-text */
import {Card} from 'react-bootstrap';
const About = () => {
 
    return (
      <div className="py-4">
         <Card className={"border border-dark bg-dark text-white"}>
          
         <Card.Header style={{"textAlign":"left"}}>
            <h3>App</h3>
            <div>Hola, soy Leandro Cruz, estudiante de Ingenieria en Sistemas de Informacion en la UTN -  Facultad Regional
                Mendoza, actualmente cursando 5to año (2021).</div>
            <div> Con esta pequeña app intento mostrar los conocimientos que poseo.</div>
          </Card.Header>
          <Card.Body>
          <div>
        <img src="uml-app.png" />      
      </div>
      <br></br>
   <div><strong>Herramientas utilizadas para el BACKEND</strong></div>
          <div>Spring Boot</div>
          <div>Java</div>
          <div>MySQL</div>
          <div>Hibernate</div>
          <div>Lombok</div>
          <br></br>
          <div><strong>Herramientas utilizadas para el FRONTEND</strong></div>
          <div>ReactJs</div>
          <div>React-Bootstrap</div>
          </Card.Body>
          <Card.Footer>
              <div><strong>Repositorios Git</strong></div>
              <div><a href="https://github.com/Streelzz/backend-api-persona">https://github.com/Streelzz/backend-api-persona</a></div>
              <div><a href="https://github.com/Streelzz/frontend-api-persona">https://github.com/Streelzz/frontend-api-persona</a></div>
              <br></br>
              <div><strong>Repositorios Docker</strong></div>
              <div><a href="https://hub.docker.com/repository/docker/streelz/image-api-persona">https://hub.docker.com/repository/docker/streelz/image-api-persona</a></div>
              <div><a href="https://hub.docker.com/repository/docker/streelz/frontend-api-persona">https://hub.docker.com/repository/docker/streelz/frontend-api-persona</a></div>
              <div></div>
          </Card.Footer>
          </Card>
      </div>
     
    );
  };
  
  export default About;