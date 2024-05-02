import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

// Componente para mostrar un item
export const Item = ({ item }) => {
  return (
    <Card className="card">
      {/* Detalles del item */}
      <Card.Img
        variant="top"
        src={item.imageURL}
        style={{ maxWidth: "50%", height: "auto" }}
      />
      <Card.Body>
        <Card.Title>Nombre: {item.title}</Card.Title>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Descripción:</span>{" "}
          {item.description}
        </Card.Text>
        <Card.Text>
          {" "}
          <span style={{ fontWeight: "bold" }}>Precio x unidad:</span> $
          {item.price} ARS
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Formato:</span> {item.categoryId}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Stock:</span> {item.stock}
        </Card.Text>
        {/* Botón para comprar el producto */}
        <Link to={`/item/${item.id}`}>
          <Button className="button" variant="primary">
            Comprar Producto
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Item;
