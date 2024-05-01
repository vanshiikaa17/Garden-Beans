import React from "react";
import { CartItemsCard } from "./CartItemsCard";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { MetaData } from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import {BsFillCartPlusFill} from "react-icons/bs";
import {HiCursorClick} from "react-icons/hi";

export const Cart = () => {
  const nav=useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQty = (quantity, id, stock) => {
    if (quantity >= stock) return;
    const newQty = quantity + 1;

    dispatch(addToCart(id, newQty));
  };
  const decreaseQty = (quantity, id) => {
    if (quantity <= 1) return;
    const newQty = quantity - 1;

    dispatch(addToCart(id, newQty));
  };
  const deleteFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler=()=>{
    nav("/login?redirect=shipping");
  }
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="EmptyCart">
            <BsFillCartPlusFill/>
          <div>Cart is empty...</div>
          <Link to="/plants">Browse Products <HiCursorClick/></Link>
        </div>
      ) : (
        <>
          <MetaData title="GARDEN BEANS - CART" />
          <div className="cart">
            <div className="cartHeader">
              <p>PRODUCT</p>
              <p>SUBTOTAL</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <div className="cartProductDetails">
                    <CartItemsCard
                      item={item}
                      deleteFromCart={deleteFromCart}
                    />
                    <p>Quantity: </p>
                    <button
                      onClick={() => {
                        decreaseQty(item.quantity, item.product);
                      }}
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
                      onClick={() => {
                        increaseQty(item.quantity, item.product, item.stock);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartTotal">
              <div></div>
              <div className="cartTotalAmount">
                <p>Cart total: </p>
                <p>₹ {`${cartItems.reduce((acc, item)=> acc+ item.price*item.quantity,0)}`}</p>
              </div>
              <div></div>
              <div className="checkoutButton">
                <button onClick={checkoutHandler}>Checkout</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
