import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import "./CheckoutPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CheckoutPage = ({ onClose }) => {
  // Add onClose prop
  const cartCtx = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });

  const inputChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitOrderHandler = async () => {
    const order = { items: cartCtx.items, customer: form };

    const response = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order }),
    });

    if (response.ok) {
      cartCtx.clearCart();
      alert("Order placed successfully!");
    } else {
      alert("Order failed!");
    }
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-page">
        <button className="close-checkout-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Checkout</h2>
        <form>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={inputChangeHandler}
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={inputChangeHandler}
          />
          <input
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={inputChangeHandler}
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={inputChangeHandler}
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={inputChangeHandler}
          />
          <button
            type="button"
            onClick={submitOrderHandler}
            className="submit-order-btn"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
