import { useContext, useState } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { Container } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

const initialValues = {
  name: "",
  phone: "",
  email: "",
};

export const Cart = () => {
  const [buyer, setBuyer] = useState(initialValues);
  
	const [formError, setFormError] = useState({
    name: false,
    phone: false,
    email: false,
  });
	const { items, clear, removeItem } = useContext(CartContext);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setBuyer((prev) => ({
      
			...prev,
      [name]: value,
    }));


    setFormError((prev) => ({
      ...prev,
      [name]: value === "",
    }));
  };

  const total = items.reduce((acu, act) => acu + act.price * act.quantity, 0);

  const handleOrder = () => {
    if (Object.values(formError).some(error => error)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor complete todos los campos del formulario",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const order = {
      buyer: buyer,
      items: items,
      total: total,
    };

    const db = getFirestore();
    const orderCollection = collection(db, "orders");

    addDoc(orderCollection, order).then(({ id }) => {
      if (id) {
        Swal.fire({
          icon: "success",
          title: "¡Orden completada!",
          text: `Su orden con codigo, ${id} ha sido completada!!`,
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  return (
    <Container
      className="mt-4 text-center"
      style={{ backgroundColor: "#e6f2fe" }}
    >
      <h1
        style={{ textAlign: "center", marginBottom: "5px", color: "#136fec" }}
      >
        MI CARRITO
      </h1>
      <table>
        <thead>
          <tr
            style={{
              textAlign: "center",
              marginBottom: "5px",
              color: "#136fec",
              padding: "1em"
            }}
          >
            <th>NOMBRE</th>
            <th>CANTIDAD</th>
            <th>PRECIO</th>
            <th>ELIMINAR</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => removeItem(item.id)}>ELIMINAR</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={clear}>VACIAR 🛒</button>
      <h2
        style={{ textAlign: "center", marginBottom: "5px", color: "#136fec" }}
      >
        DATOS
      </h2>
      <form className="form-container">
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={buyer.name}
            name="name"
            onChange={handleChange}
          />
          {formError.name && <p style={{ color: 'red' }}>Por favor ingrese su nombre</p>}
        </div>
        <div>
          <label>Celular</label>
          <input
            type="number"
            value={buyer.phone}
            name="phone"
            onChange={handleChange}
          />
          {formError.phone && <p style={{ color: 'red' }}>Por favor ingrese su número de teléfono</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={buyer.email}
            name="email"
            onChange={handleChange}
          />
          {formError.email && <p style={{ color: 'red' }}>Por favor ingrese su correo electrónico</p>}
        </div>
        <button onClick={handleOrder}>COMPRAR</button>
      </form>
    </Container>
  );
};