// Importación de módulos y componentes
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ItemDetail } from "./ItemDetail";
import "../App.css";

// Componente para mostrar los detalles de un item
export const ItemDetailContainer = () => {
  // Estado para almacenar el item y el ID del parámetro de la URL
  const [item, setItem] = useState(null);
  const { id } = useParams();

  // Efecto para cargar los detalles del item desde Firestore
  useEffect(() => {
    const db = getFirestore();

    const refDoc = doc(db, "items", id);

    // Obtener el documento correspondiente al ID
    getDoc(refDoc).then((snapshot) => {
      // Almacenar el documento en el estado
      setItem({ id: snapshot.id, ...snapshot.data() });
    });
  }, [id]);

  // Si no hay item, retornar null
  if (!item) return null;

  // Si hay item, mostrar los detalles
  return (
    <Container className="mt-4 text-center">
      <Card className="my-4 mx-auto p-4" style={{ width: "90%" }}>
        <div className="image-container">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="img-fluid"
            style={{ maxWidth: "%", height: "auto" }}
          />
        </div>
        <ItemDetail item={item} />
      </Card>
    </Container>
  );
};
