import React from "react";
import { MetaData } from "../layout/MetaData";
import { ActiveSteps } from "./ActiveSteps";
import "./confirmOrder.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const ConfirmOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const address = `${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.state}, ${shippingInfo.country} ${shippingInfo.pincode} `;
  const nav=useNavigate();
  const price = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shipping = price > 1000 ? 0 : 100;

  const totalPrice = price + shipping;
    const proceedToPayment=()=>{
      const data={
        price, shipping, totalPrice
      }
      sessionStorage.setItem("cartFinal", JSON.stringify(data));
      nav("/order/payment");

    }
  return (
    <>
      <MetaData title="Garden Beans - Confirm Order" />
      <ActiveSteps activeStep={1} />

      <div className="confirmOrderPage">
        {/* user details */}
        <div>
          <div className="userInformation">
            <h3>Deliver to: </h3>
            <div className="userInfoBox">
              <p><b>{user.name}</b></p>
              <p>Phone no.: <b>{shippingInfo.phoneNo}</b></p>
              <p>Address: <b>{address}</b></p>
            </div>
          </div>
          {/* order */}
          <div className="orderSummary">
            <h3>Order Summary</h3>
            <div className="cartItemsList">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt={item.product} />
                    <span>
                      <Link to={`/plants/${item.product}`}>{item.name}</Link>
                    </span>
                    <span>
                      <p>
                        Quantity: <b>{item.quantity}</b>
                      </p>
                    </span>
                    <span>
                      <p>
                        Subtotal: <b>₹{item.quantity * item.price}</b>
                      </p>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* total */}
        
          <div className="totalPrice">
            <h3>Price Details</h3>
            <div>
              <div>
                <p>Total Items: {cartItems.length}</p>
              </div>
              <div>
                <p>
                  Price: ₹{price}
                </p>
              </div>
              <div>
                <p>
                  Shipping Charges: ₹{shipping}
                </p>
              </div>
            </div>
            <div className="totalCharge">
            <p>Total: <b>₹{totalPrice}</b> </p>
            <div className="paymentButtonDiv">
            <button className="proceedButton" onClick={proceedToPayment}> Proceed To Payment</button>
            </div>
            </div>
          </div>
        </div>
      
    </>
  );
};
