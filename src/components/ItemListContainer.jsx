import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  getFirestore,
  getDocs,
  query, 
  where, 
  collection 
} from "firebase/firestore" ;

import Container from "react-bootstrap/Container";
import { ItemList } from "./ItemList";


export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();

    let refCollection;

    if(!id) refCollection = collection(db, "items");
    else {
      refCollection = query(collection(db, "items"), 
      where("categoryId", "==", id)
      )
    }

    getDocs(refCollection).then((snapshot) => {
      setProducts(
        snapshot.docs.map((doc)=> {
          return{ id: doc.id, ...doc.data() };
        })
      );
    });
  }, [id]);


  return (
    <Container className="container">
      <ItemList products={products} />
    </Container>
  );
};
