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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

    getDocs(refCollection)
      .then((snapshot) => {
          setItems(
            snapshot.docs.map((doc)=> {
                return{ id: doc.id, ...doc.data() };
            })
          );
      })
      .finally(() => setLoading(false))
    }, [id]);

    if (loading) {
      return (
          <div className="loader-wrapper">
              <div className="loader"></div>
          </div>
      );
  }
  
  return (
    <Container className="mt-4">
    <h1
      style={{ textAlign: "center", marginBottom: "20px", color: "#136fec" }}
    >
      NUESTROS PRODUCTOS
    </h1>
    <ItemList items={items} />
  </Container>
  );
};