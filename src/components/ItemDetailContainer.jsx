import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card'; 
import { getFirestore, getDoc, doc, } from 'firebase/firestore';
import { ItemDetail } from './ItemDetail';

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
      <Container className='mt-4 text-center' >
        <Card>
          <ItemDetail item={item}/>
        </Card>
      </Container>
    )
}

export default ItemDetailContainer;