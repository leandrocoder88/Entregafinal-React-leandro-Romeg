import { Item } from "./Item"; // Importar el componente de ítem individual
import React from "react"; // Importar React

// Componente funcional que muestra una lista de ítems
export const ItemList = ({ items }) => {
  return (
    <div className="row justify-content-center d-flex flex-wrap justify-content-center">
      {items.map((item) => (
        <Item key={item.id} item={item} /> // Renderizar cada ítem utilizando el componente Item
      ))}
      ;
    </div>
  );
};
