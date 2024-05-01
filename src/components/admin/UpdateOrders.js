import React, { useEffect, useState } from "react";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { TopBar } from "./TopBar";
import "./updateOrders.css";
import { useAlert } from "react-alert";
import { Loading } from "../layout/loading/Loading";
import { clearErrors, getOrder, updateOrder } from "../../actions/orderActions";
import {MdLocalShipping} from "react-icons/md"
import { UPDATE_ORDER_ADMIN_RESET } from "../../constants/orderConstants";
export const UpdateOrders = () => {
  const { error, loading, order } = useSelector((state) => state.orderDetails);
  const {error:updateError,isUpdated} =useSelector(state=>state.editOrder);
 
  const alert = useAlert();
  const dispatch = useDispatch();
  const processOrder = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);
      
    dispatch(updateOrder(id, myForm));
  };
  const [status, setStatus] = useState("");
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated.");
      dispatch({type:UPDATE_ORDER_ADMIN_RESET});
    }
    dispatch(getOrder(id));
  }, [error, alert, dispatch, id, isUpdated, updateError]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Garden Beans - Update Order" />
          <div className="dashboardtopbar">
            <TopBar />
          </div>
          <div className="confirmOrderPage">
            {/* user details */}
            <div className="userOrder">
              <div className="orderInfo">
                <h3>Billing Address </h3>
                <div className="userInfoBox">
                  <p>
                    <b>{order.user && order.user.name}</b>
                  </p>
                  <p>
                    Phone no.:{" "}
                    <b>
                      {order.shippingDetails && order.shippingDetails.phoneNo}
                    </b>
                  </p>
                  <p>
                    Address:{" "}
                    <b>
                      {order&&order.shippingDetails &&
                        `${order.shippingDetails.address}, ${order.shippingDetails.city} ${order.shippingDetails.state}, ${order.shippingDetails.country} ${order.shippingDetails.pincode}`}
                    </b>
                  </p>
                </div>
              </div>
              {/* order */}
              <div className="orderSummary">
                <h3>Order Summary</h3>
                <div className="cartItemsList">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt={item.product} />
                        <span>
                          <Link to={`/plants/${item.product}`}>
                            {item.name}
                          </Link>
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
            
              <div>
                <div className="orderInfo">
                  <h3>Payment Details</h3>
                  <div className="userInfoBox">
                    <p
                      className={
                        order.payment && order.payment.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      <b>
                        {order.payment && order.payment.status === "succeeded"
                          ? "PAID"
                          : "PENDING"}
                      </b>
                    </p>
                    {order.payment && (
                      <p>
                        Payment ID: <b>{order.payment.id}</b>
                      </p>
                    )}
                  </div>
                  <div className="userInfoBox">
                    <p>
                      Amount-{" "}
                      <b>{order.grandTotal && `₹${order.grandTotal}`}</b>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="orderInfo">
                  <h3>Order Status</h3>
                  <div className="userInfoBox">
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      <b>
                        {order.orderStatus && order.orderStatus}
                      </b>
                    </p>
                  </div>
                </div>
                
                <form
                  className="updateOrderForm"
                  encType="multipart/form-data"
                  onSubmit={processOrder}
                >
                 
                  <div className="updateOrderInputFields">
                    <MdLocalShipping />
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="updateOrderInput"
                    >
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                      {order.orderStatus === "Processing" && <option value="Shipped">Shipped</option>  }                      
                    </select>
                  </div>
                  <input
                    type="submit"
                    value="Update Order"
                    className="updateOrderButton"
                    disabled={loading ? true : false || status === "" ?true:false}
                  />
                </form>
                
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
