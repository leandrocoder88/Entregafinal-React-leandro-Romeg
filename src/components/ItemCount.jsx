import React, { useState } from "react";
import { Link } from "react-router-dom";

// Componente para contar la cantidad de items a agregar al carrito
export const ItemCount = ({ onAdd, stock }) => {
  // Estado para la cantidad de items seleccionada
  const [count, setCount] = useState(1);

  // Función para incrementar la cantidad
  const handleIncrease = () => {
    if (stock > count) setCount(count + 1);
  };

  // Función para decrementar la cantidad
  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  // Función para agregar los items al carrito
  const handleAdd = () => {
    setCount(1);
    onAdd(count);
  };

  return (
    <div>
      {/* Botones para incrementar y decrementar la cantidad */}
      <button className="btn btn-outline-primary mr-2" onClick={handleDecrease}>
        ➖
      </button>
      <input value={count} readOnly />
      <button
        className="btn btn-outline-primary ml-2 mr-2"
        onClick={handleIncrease}
      >
        ➕
      </button>
      {/* Botón para agregar al carrito */}
      <button className="btn btn-primary mr-2" onClick={handleAdd}>
        AGREGAR AL CARRITO
      </button>
      {/* Enlace para volver a la lista de productos */}
      <Link to="/">
        <button className="btn btn-secondary">Agregar otros productos</button>
      </Link>
    </div>
  );
};

export default ItemCount;
