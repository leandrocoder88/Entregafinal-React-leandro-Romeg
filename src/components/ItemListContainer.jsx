// Importación de módulos y componentes
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import Container from "react-bootstrap/Container";
import { ItemList } from "./ItemList";

// Componente para mostrar una lista de items
export const ItemListContainer = () => {
  // Estado para almacenar los items y estado de carga
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener el parámetro de la URL para filtrar los items por categoría
  const { id } = useParams();

  // Efecto para cargar los items desde Firestore
  useEffect(() => {
    const db = getFirestore();
    let refCollection;

    // Si no hay categoría especificada, obtener todos los items
    if (!id) refCollection = collection(db, "items");
    // Si hay categoría, filtrar los items por esa categoría
    else {
      refCollection = query(
        collection(db, "items"),
        where("categoryId", "==", id)
      );
    }

    // Obtener los documentos de la colección
    getDocs(refCollection)
      .then((snapshot) => {
        // Mapear los documentos a objetos JavaScript y almacenarlos en el estado
        setItems(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      })
      .finally(() => setLoading(false)); // Establecer el estado de carga como false cuando se completa la carga
  }, [id]);

  // Si está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no está cargando, mostrar la lista de items
  return (
    <Container className="container-item-list" fluid="sm">
      <div className="item-list-container">
        <ItemList items={items} />
      </div>
    </Container>
  );
};
