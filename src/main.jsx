import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCVa2T8jvFw9h_qCU2zEYMynBcoaATWvw8",
  authDomain: "ecommerce-entrega-final-reac.firebaseapp.com",
  projectId: "ecommerce-entrega-final-reac",
  storageBucket: "ecommerce-entrega-final-reac.appspot.com",
  messagingSenderId: "746771387082",
  appId: "1:746771387082:web:682a1712f853a928a81a33"
};


initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
