import Container from "react-bootstrap/Container"; // Importar el componente Container de react-bootstrap
import Nav from "react-bootstrap/Nav"; // Importar el componente Nav de react-bootstrap
import Navbar from "react-bootstrap/Navbar"; // Importar el componente Navbar de react-bootstrap
import { NavLink } from "react-router-dom"; // Importar NavLink de react-router-dom para la navegación
import { CartWidget } from "./CartWidget"; // Importar el componente CartWidget para mostrar el carrito

// Componente funcional que representa la barra de navegación
export const NavBar = () => {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand to="/" className="mr-auto" as={NavLink}>
            Ceramica Roma {/* Título de la marca */}
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link to="/category/Tazas" as={NavLink}>
              Tazas {/* Enlace a la categoría Tazas */}
            </Nav.Link>
            <Nav.Link to="/category/Pocillos" as={NavLink}>
              Pocillos {/* Enlace a la categoría Pocillos */}
            </Nav.Link>
            <Nav.Link to="/category/Platos" as={NavLink}>
              Platos {/* Enlace a la categoría Platos */}
            </Nav.Link>
            <CartWidget /> {/* Mostrar el widget del carrito */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
