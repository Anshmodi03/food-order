import React, { useState, useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../context/CartContext";
import "./MealItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const MealItem = ({ meal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const cartCtx = useContext(CartContext);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      quantity: quantity,
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    closeModalHandler();
  };

  return (
    <>
      <div className="meal-bg">
        <div className="meal-item">
          <img
            src={`http://localhost:3001/${meal.image}`}
            alt={meal.name}
            className="meal-image"
            onClick={openModalHandler}
          />
          <h2>{meal.name}</h2>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModalHandler}>
          <div className="meal-details-popup">
            <h2>{meal.name}</h2>
            <p>{meal.description}</p>
            <p className="meal-price">${meal.price}</p>
            <div className="meal-actions-popup">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
                className="quantity-input-popup"
              />
              <button onClick={addToCartHandler} className="add-to-cart-btn">
                Add to Cart
              </button>
              <button onClick={closeModalHandler} className="close-modal-btn">
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showNotification && (
        <div className="notification">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="notification-icon"
          />
          <p>Added to Cart!</p>
        </div>
      )}
    </>
  );
};

export default MealItem;
