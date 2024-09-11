import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./CartPage.css";

const CartPage = ({ onClose }) => {
  const cartCtx = useContext(CartContext);

  return (
    <div className="cart-page">
      <button onClick={onClose} className="close-btn">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2>Your Cart</h2>
      {cartCtx.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartCtx.items.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} (${item.price * item.quantity})
            </li>
          ))}
        </ul>
      )}
      <div className="total-amount">
        Total Amount: ${cartCtx.totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default CartPage;
