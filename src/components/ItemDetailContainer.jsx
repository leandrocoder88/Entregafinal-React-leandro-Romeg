import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card'; 
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { ItemDetail } from './ItemDetail';
import "../App.css";

export const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();

    const refDoc = doc(db, "items", id);

    getDoc(refDoc).then((snapshot) => {
      setItem({ id: snapshot.id, ...snapshot.data() });
    });
  }, [id]);

  if (!item) return null;
  
  return (
    <Container className='mt-4 text-center'>
      <Card className="my-4 mx-auto p-4" style={{ width: '90%' }}>
        <div className="image-container">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="img-fluid" // Utiliza la clase img-fluid de Bootstrap para que la imagen sea responsive
            style={{ maxWidth: "%", height: "auto" }} // Establecer estilos para la imagen
          />
        </div>
        <ItemDetail item={item}/>
      </Card>
    </Container> 
  );
};

export default ItemDetailContainer;

