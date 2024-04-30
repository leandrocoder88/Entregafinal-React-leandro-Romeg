import {BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { NavBar } from "./components/NavBar";
import { CartProvider} from "./context/CartContext";
import { Cart } from "./components/Cart";
import 'sweetalert2/dist/sweetalert2.min.css';

function NotFound(){
  return <h1>404 - Ups, Página No Encontrada</h1>
}
function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer/>} />
            <Route path="/category/:id" element={<ItemListContainer/>} />
            <Route path="/cart" element={<Cart />}/>
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>  
    </div>
  );
}

export default App;
