import cart from "../assets/cart.png"; // Importar la imagen del carrito
import { Link } from "react-router-dom"; // Importar el componente Link de react-router-dom para la navegación
import { useContext } from "react"; // Importar el hook useContext de React
import { CartContext } from "../context/CartContext"; // Importar el contexto del carrito

// Componente funcional que muestra el ícono del carrito y el número de ítems en el carrito
export const CartWidget = () => {
  const { items } = useContext(CartContext); // Obtener los ítems del carrito desde el contexto

  // Calcular el total de ítems en el carrito sumando las cantidades de cada ítem
  const total = items.reduce(
    (acumulador, valorActual) => acumulador + valorActual.quantity,
    0
  );

  // Si no hay ítems en el carrito, no mostrar el widget
  if (!total) return null;

  // Renderizar el ícono del carrito y el número de ítems como un enlace al checkout
  return (
    <Link to="/checkout">
      <div id="cart-widget">
        <img src={cart} alt="Carrito de Compras" height={40} />{" "}
        {/* Ícono del carrito */}
        <span>{total}</span> {/* Número de ítems en el carrito */}
      </div>
    </Link>
  );
};
