import { ItemCount } from "./ItemCount";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

export const ItemDetail = ({ item }) => {
  const { addItem } = useContext(CartContext);

  const add = (quantity) => addItem(item, quantity);

  return (
    <Container
      className="mt-4 text-center"
      style={{ backgroundColor: "#e6f2fe" }}
    >
      {item && (
        <>
          <div>{item.title}</div>
          <div>{item.categoryId}</div>
          <div>Stock {item.stock}</div>
          <div>${item.price}</div>
          <img src={item.imageURL} alt={item.title} />
          <ItemCount onAdd={add} stock={item.stock} />
        </>
      )}
    </Container>
  );
};

export default ItemDetail;