import React, { useState } from "react";
import { Link } from "react-router-dom";
export const ItemCount = ({ onAdd, stock }) => {
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    if (stock > count) setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAdd = () => {
    setCount(1);
    onAdd(count);
  };

  return (
    <div>
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
      <button className="btn btn-primary mr-2" onClick={handleAdd}>
        AGREGAR AL CARRITO
      </button>
      <Link to="/">
        <button className="btn btn-secondary">Agregar otros productos</button>
      </Link>
    </div>
  );
};
