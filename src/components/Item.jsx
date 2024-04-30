import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export const Item = ({ item }) => {
    return (
      <Card className="card">
      <Card.Img variant="top" src={item.imageURL} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
        <Card.Text>
          ${item.price}
        </Card.Text>
        <Card.Text>
          {item.categoryId}
        </Card.Text>
        <Card.Text>
          Stock {item.stock}
        </Card.Text>
          <Link to={`/item/${item.id}`}><Button className= "button" variant="primary">Ver Producto</Button></Link>
      </Card.Body>
    </Card>
  );
}


