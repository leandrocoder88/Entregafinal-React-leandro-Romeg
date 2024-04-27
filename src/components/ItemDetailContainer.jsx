import {useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card'; 
import data from "../data/products.json";

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const {items} = useContext(CartContext)
  
  const { id } = useParams();

  useEffect(() => {
    const get = new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 2000);
    });

    get.then((data) => {
              const filteredData = data.find(d => d.id === Number(id));
              setProduct(filteredData);
    });
  }, [id]);
  
  if (!product) return null;
  
  return (
      <Container className='mt-4 text-center' >
        <Card>
            <Card.Img variant="top" src={product.imageURL} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                {product.description}
                </Card.Text>
                <Card.Text>$
                {product.price}
                </Card.Text>
                <Card.Text>
                {product.categoryId}  
                </Card.Text>
            </Card.Body>
        </Card>
      </Container>
    )
}
