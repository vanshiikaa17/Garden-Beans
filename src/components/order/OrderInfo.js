import React, {useEffect} from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getOrder, clearErrors } from '../../actions/orderActions';
import { Loading } from '../layout/loading/Loading';
import { MetaData } from '../layout/MetaData';
import "./orderInfo.css"

export const OrderInfo = () => {
    const {error, loading, order} =useSelector(state=>state.orderDetails);
    const alert=useAlert();
    const dispatch =useDispatch();
    const {id}=useParams();
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(getOrder(id));
     }, [error, alert, dispatch, id])
    
    
  return (
    <>
    <MetaData title="Order History"/>
        {loading?
            (<Loading/>) :(
                <div className="OrderDetailsPage">
                <div className="orderHeading">
                    <p>Order #{order._id}</p>
                </div>
                {/* user details */}
                <div>
                  <div className="orderInfo">
                    <h3>Billing Address </h3>
                    <div className="userInfoBox">
                      <p><b>{order.user&&order.user.name}</b></p>
                      <p>Phone no.: <b>{order.shippingDetails && order.shippingDetails.phoneNo}</b></p>
                      <p>Address: <b>{order.shippingDetails && 
                      `${order.shippingDetails.address}, ${order.shippingDetails.city} ${order.shippingDetails.state}, ${order.shippingDetails.country} ${order.shippingDetails.pincode}`
                      }</b></p>
                    </div>
                  </div>
                 
                </div>
                <div>
                  <div className="orderInfo">
                    <h3>Payment Details</h3>
                    <div className="userInfoBox">
                      <p className={order.payment&&order.payment.status === "succeeded" ? "greenColor":"redColor"}><b>{order.payment&&order.payment.status === "succeeded" ? "PAID":"PENDING"}</b></p>
                    {order.payment&&
                        (<p>Payment ID: <b>{order.payment.id}</b></p>
                           
                        )
                    }  
                    </div>
                    <div className="userInfoBox">
                        
                        <p>Amount- <b>{order.grandTotal && `₹${order.grandTotal}`}</b></p>
                    </div>
                  </div>
                  </div>

                <div>
                  <div className="orderInfo">
                    <h3>Order Status</h3>
                    <div className="userInfoBox">
                      <p className={order.orderStatus&&order.orderStatus === "Pending" ? "redColor":"greenColor"}><b>{order.orderStatus&&order.orderStatus}</b></p>
                    
                    </div>
                    
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
            )   
    }
    </>
  )
}
