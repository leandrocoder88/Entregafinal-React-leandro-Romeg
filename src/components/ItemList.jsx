import { Item } from "./Item";
import React from "react";

export const ItemList = ({ items }) => {
  return (
        <div className="row justify-content-center d-flex flex-wrap justify-content-center">
          {items.map((item) => (<Item key={item.id} item={item} />))};
        </div>
  );
};
