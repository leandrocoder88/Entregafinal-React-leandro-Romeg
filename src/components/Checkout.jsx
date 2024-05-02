import { useContext, useState, useEffect } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { Container } from "react-bootstrap";
import { CartContext } from "../context/CartContext"; // Importamos el contexto del carrito
import Swal from "sweetalert2"; // Importamos SweetAlert2 para mostrar alertas
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la navegación programática
import { Link } from "react-router-dom"; // Importamos Link para crear enlaces
import errorImage from "../assets/errorcampo.gif"; // Importamos la imagen de error
import "../App.css"; // Importamos los estilos

// Estado inicial del formulario
const initialValues = {
  name: "",
  phone: "",
  email: "",
  confirmEmail: "", // Nuevo campo para confirmar el correo electrónico
};

// Componente Checkout
export const Checkout = () => {
  // Estados
  const [buyer, setBuyer] = useState(initialValues); // Estado para los datos del comprador
  const [cartEmpty, setCartEmpty] = useState(false); // Estado para verificar si el carrito está vacío
  const [processingOrder, setProcessingOrder] = useState(false); // Estado para indicar si se está procesando la orden
  const [validEmail, setValidEmail] = useState(true); // Estado para validar el correo electrónico
  const { clear, items, removeItem } = useContext(CartContext); // Obtenemos los datos del contexto del carrito
  const navigate = useNavigate(); // Función para la navegación

  // Efecto para verificar si el carrito está vacío
  useEffect(() => {
    setCartEmpty(items.length === 0);
  }, [items]);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (ev) => {
    let { value, name } = ev.target;

    // Remover caracteres no numéricos excepto guiones y espacios en el campo de teléfono
    if (name === "phone") {
      value = value.replace(/[^0-9\- ]/g, "");
    }

    if (name === "email") {
      // Validar el correo electrónico
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setValidEmail(isValid);
    }
    setBuyer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para validar el formulario
  const validate = () => {
    if (
      !buyer.name.trim() ||
      !buyer.phone.trim() ||
      !buyer.email.trim() ||
      buyer.email !== buyer.confirmEmail || // Verificar si los correos electrónicos son iguales
      !validEmail // Verificar si el correo electrónico es válido
    ) {
      // Mostrar alerta si hay campos inválidos
      Swal.fire({
        title: "🚨🚨uupps, que incomodo!🚨🚨",
        imageUrl: errorImage,
        imageWidth: 300,
        imageHeight: 300,
        text: "✍Por favor completa todos los campos y asegúrate de que los correos electrónicos coincidan y sean válidos✍",
      });
      return false;
    }
    return true;
  };

  // Calcular el total de la compra
  const total = items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  // Función para manejar la orden de compra
  const handleOrder = async () => {
    if (!validate()) return;

    setProcessingOrder(true);

    const order = {
      buyer: buyer,
      items: items,
      total: total,
    };

    const db = getFirestore();
    const ordersCollection = collection(db, "orders");

    try {
      const { id } = await addDoc(ordersCollection, order);

      if (id) {
        // Mostrar alerta de éxito y limpiar el carrito
        Swal.fire({
          icon: "success",
          title:
            "¡Compra realizada con éxito!, Gracias por confiar en nosotros!",
          text: `ID de compra: ${id}`,
          confirmButtonText: "Hasta luego",
        }).then(() => {
          navigate("/");
          clear();
        });
      }
    } catch (error) {
      console.error("Error al agregar documento: ", error);
      setProcessingOrder(false);
    }
  };

  // Función para vaciar el carrito
  const handleClearShop = () => {
    clear();
  };

  // Renderizar el componente
  return (
    <Container className="mt-4">
      <div className="carrito-checkout">
        {/* Verificar si el carrito está vacío */}
        {cartEmpty && (
          <div className="carrito-vacio">
            <p>¡Ups! El carrito está vacío. </p>
            <Link to="/">
              <button>Volver a ver los productos</button>
            </Link>
          </div>
        )}
        {/* Mostrar datos del carrito y formulario de compra */}
        {!cartEmpty && (
          <div className="carrito-datos-total">
            <h1>Carrito</h1>
            {/* Mostrar productos en el carrito */}
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Imagen</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>
                        <img src={item.imageURL} alt={item.title} />
                      </td>
                      <td>{item.quantity}</td>
                      <td>$ {item.price} ARS</td>
                      <td>
                        <button onClick={() => removeItem(item.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mostrar el total de la compra */}
            <div className="precio-final">
              <h2>El monto total de su compra es : ${total} ARS</h2>
            </div>
            {/* Botones para continuar comprando y vaciar carrito */}
            <Link to="/">
              <button className="btn btn-secondary">Seguir comprando</button>
            </Link>
            <button className="btn btn-danger" onClick={handleClearShop}>
              Vaciar carrito
            </button>
            {/* Formulario de compra */}
            <div className="form-checkout">
              <h2>Datos</h2>
              <form>
                {/* Campos del formulario */}
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={buyer.name}
                    name="name"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Celular/Telefono Fijo</label>
                  <input
                    type="tel"
                    value={buyer.phone}
                    name="phone"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={buyer.email}
                    name="email"
                    onChange={handleChange}
                    className={`form-control ${
                      !validEmail ? "border-danger" : ""
                    }`}
                  />
                  {/* Mostrar mensaje de error si el correo electrónico no es válido */}
                  {!validEmail && (
                    <div className="text-danger">
                      Correo electrónico inválido
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Confirmar Email</label>
                  <input
                    type="email"
                    value={buyer.confirmEmail}
                    name="confirmEmail"
                    onChange={handleChange}
                    className={`form-control ${
                      !validEmail ? "border-danger" : ""
                    }`}
                  />
                  {/* Mostrar mensaje de error si el correo electrónico no es válido */}
                  {!validEmail && (
                    <div className="text-danger">
                      Correo electrónico inválido
                    </div>
                  )}
                </div>
              </form>
              {/* Botón para realizar la compra */}
              <button
                type="button"
                onClick={handleOrder}
                className="btn btn-primary"
              >
                Comprar
              </button>
            </div>
          </div>
        )}
        {/* Mostrar mensaje de procesamiento de la orden */}
        {processingOrder && (
          <div className="loader-checkout">Estamos procesando su pedido...</div>
        )}
      </div>
    </Container>
  );
};
