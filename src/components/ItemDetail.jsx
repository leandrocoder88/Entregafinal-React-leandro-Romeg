import { ItemCount } from "./ItemCount";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

// Componente para mostrar los detalles de un item
export const ItemDetail = ({ item }) => {
  // Contexto del carrito para agregar items
  const { addItem } = useContext(CartContext);

  // Función para agregar items al carrito
  const add = (quantity) => addItem(item, quantity);

  return (
    <Container
      className="mt-1 text-center"
      style={{ backgroundColor: "#e6f2fe" }}
    >
      {item && (
        <>
          {/* Detalles del item */}
          <div>Nombre: {item.title}</div>
          <div>Tipo: {item.categoryId}</div>
          <div>${item.price} ARS</div>
          <img
            src={item.imageURL}
            alt={item.title}
            style={{ maxWidth: "35%", height: "auto" }}
          />
          {/* Contador de cantidad de items */}
          <ItemCount onAdd={add} stock={item.stock} />
        </>
      )}
    </Container>
  );
};

export default ItemDetail;
