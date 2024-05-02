import { ItemCount } from "./ItemCount";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

export const ItemDetail = ({ item }) => {
  const { addItem } = useContext(CartContext);

  const add = (quantity) => addItem(item, quantity);

  return (
    <Container
      className="mt-1 text-center"
      style={{ backgroundColor: "#e6f2fe" }}
    >
      {item && (
        <>
          <div>Nombre: {item.title}</div>
          <div>Tipo: {item.categoryId}</div>
          <div>${item.price} ARS</div>
          <img
            src={item.imageURL}
            alt={item.title}
            style={{ maxWidth: "35%", height: "auto" }}
          />
          <ItemCount onAdd={add} stock={item.stock} />
        </>
      )}
    </Container>
  );
};

export default ItemDetail;
