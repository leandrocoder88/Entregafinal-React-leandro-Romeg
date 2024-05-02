import cart from "../assets/cart.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const CartWidget = () => {
  const { items } = useContext(CartContext);

  const total = items.reduce(
    (acumulador, valorActual) => acumulador + valorActual.quantity,
    0
  );
  if (!total) return null;

  return (
    <Link to="/checkout">
      <div id="cart-widget">
        <img src={cart} alt="Carrito de Compras" height={40} />
        <span>{total}</span>
      </div>
    </Link>
  );
};
