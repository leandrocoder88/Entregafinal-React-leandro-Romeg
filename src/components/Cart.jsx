import { useContext, useState, useEffect } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { Container } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import errorImage from "../assets/errorcampo.gif";
import "../App.css";

const initialValues = {
    name: "",
    phone: "",
    email: "",
};

export const Cart = () => {
    const [buyer, setBuyer] = useState(initialValues);
    const [cartEmpty, setCartEmpty] = useState(false);
    const [processingOrder, setProcessingOrder] = useState(false);
    const { clear, items, removeItem } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        setCartEmpty(items.length === 0);
    }, [items]);

    const handleChange = (ev) => {
        const { value, name } = ev.target;
        setBuyer((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        if (!buyer.name.trim() || !buyer.phone.trim() || !buyer.email.trim()) {
            Swal.fire({
                title: "🚨🚨uupps, que incomodo!🚨🚨",
                imageUrl: errorImage,
                imageWidth: 300,
                imageHeight: 300,
                text: "✍Por favor completa todos los campos✍",
            });
            return false;
        }
        return true;
    };

    const total = items.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.price * currentItem.quantity);
    }, 0);

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
                Swal.fire({
                    icon: "success",
                    title: "¡Compra realizada con éxito!",
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

    const handleClearShop = () => {
        clear();
    };

    return (
        <Container className="mt-4">
            <div className="carrito-checkout">
                {cartEmpty && (
                    <div className="carrito-vacio">
                        <p>¡Ups! El carrito está vacío. </p>
                        <Link to="/">
                            <button>Volver a ver los productos</button>
                        </Link>
                    </div>
                )}
                {!cartEmpty && (
                    <div className="carrito-datos-total">
                        <h1>Carrito</h1>
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
                                            <td>{item.price}</td>
                                            <td>
                                                <button onClick={() => removeItem(item.id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h2>El monto total de su compra es : ${total} ARS</h2>
                        </div>
                        <Link to="/">
                            <button className="btn btn-secondary">Seguir comprando</button>
                        </Link>
                        <button className="btn btn-danger" onClick={handleClearShop}>Vaciar carrito</button>
                        <div className="form-checkout">
                            <h2>Datos</h2>
                            <form>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" value={buyer.name} name="name" onChange={handleChange} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Celular/Telefono Fijo</label>
                                    <input type="text" value={buyer.phone} name="phone" onChange={handleChange} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={buyer.email} name="email" onChange={handleChange} className="form-control" />
                                </div>
                            </form>
                            <button type="button" onClick={handleOrder} className="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                )}
                {processingOrder && (
                    <div className="loader-checkout">Estamos procesando su pedido...</div>
                )}
            </div>
        </Container>
    );
};
