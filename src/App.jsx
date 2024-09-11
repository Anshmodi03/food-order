import React, { useState, Suspense } from "react";
import { CartProvider } from "./context/CartContext";
import "./App.css";

const MealsPage = React.lazy(() => import("./pages/MealsPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
import Modal from "./components/UI/Modal"; // Ensure you have a Modal component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faShoppingCart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handlers to open/close the checkout modal
  const openCheckoutHandler = () => setIsCheckoutOpen(true);
  const closeCheckoutHandler = () => setIsCheckoutOpen(false);

  // Handlers to open/close the cart modal
  const openCartHandler = () => setIsCartOpen(true);
  const closeCartHandler = () => setIsCartOpen(false);

  return (
    <CartProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <MealsPage />

        {/* Cart Button */}
        <button onClick={openCartHandler} className="cart-btn">
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>

        {/* Checkout Button */}
        <button onClick={openCheckoutHandler} className="checkout-btn">
          <FontAwesomeIcon icon={faCreditCard} />
        </button>

        {/* Cart modal */}
        {isCartOpen && (
          <Modal onClose={closeCartHandler}>
            <CartPage onClose={closeCartHandler} />
          </Modal>
        )}

        {/* Checkout modal */}
        {isCheckoutOpen && (
          <Modal onClose={closeCheckoutHandler}>
            <CheckoutPage onClose={closeCheckoutHandler} />
          </Modal>
        )}
      </Suspense>
    </CartProvider>
  );
}

export default App;
