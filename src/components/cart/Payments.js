import React,{useEffect} from 'react'
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from "@stripe/react-stripe-js"
import { ActiveSteps } from './ActiveSteps'
import { MetaData } from '../layout/MetaData'
import {BsFillCreditCard2FrontFill} from "react-icons/bs";
import {MdDateRange, MdVpnKey} from "react-icons/md";
import { useRef } from 'react';
import "./payments.css"
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {createOrder, clearErrors } from '../../actions/orderActions';

export const Payments = () => {
    const dispatch = useDispatch();
    const alert=useAlert();
    const stripe=useStripe();
    const elements=useElements();
    const nav=useNavigate();
    const {shippingInfo, cartItems} = useSelector(state=>state.cart);
    const {user}=useSelector(state=>state.user);
    const {error}=useSelector(state=>state.order)
    const cartFinal=JSON.parse(sessionStorage.getItem("cartFinal"));

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors);
      }
    }, [alert, error,dispatch]);
    

    const paymentData={
        amount:Math.round(cartFinal.totalPrice *100)
    }

    const order={
        shippingDetails:shippingInfo,
        orderItems:cartItems,
        totalPrice:cartFinal.price,
        taxPrice:0,
        shippingPrice:cartFinal.shipping,
        grandTotal:cartFinal.totalPrice

    }
    const paymentFormSubmit=async(e)=>{
        e.preventDefault();

        paymentBtn.current.disabled = true;

        try{
            const requestHeaders={
                headers:{
                    "Content-Type":"application/json"
                }
            }

            const {data}=await axios.post("/api/payments/process/newpayment", paymentData, requestHeaders);

            const clientSecret=data.client_secret;

            if(!stripe || !elements)return;

            const confirm= await stripe.confirmCardPayment(clientSecret, {
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pincode,
                            country:shippingInfo.country
                        }
                    }
                }
            });
            if(confirm.error){
                paymentBtn.current.disabled=false;

                alert.error(confirm.error.message);
            }else{
                if(confirm.paymentIntent.status === "succeeded"){

                    order.payment={
                        id:confirm.paymentIntent.id,
                        status:confirm.paymentIntent.status
                    }

                    dispatch(createOrder(order))
                    nav("/payment/success");
                }else{
                    alert.error("An issue occurred while processing payment.")
                }
            }

        }catch(err){
            paymentBtn.current.disabled=false;
            alert.error(err.response.data.message);
        }
    }

    const paymentBtn =useRef(null);
  return (
    <>
        <MetaData title="Garden Beans - Payments"/>
        <ActiveSteps activeStep={2}/>
        <div className="paymentContainer">
            <form className='paymentForm' onSubmit={(e)=>paymentFormSubmit(e)}>
                <h2>Card Details</h2>
                <div className='paymentDiv'>
                    <BsFillCreditCard2FrontFill/>
                    <CardNumberElement className='paymentInput'/>
                </div>
                <div className='paymentDiv'>
                    <MdDateRange/>
                    <CardExpiryElement className='paymentInput'/>
                </div>
                <div className='paymentDiv'>
                    <MdVpnKey/>
                    <CardCvcElement className='paymentInput'/>
                </div>

                <input
                type="submit"
                value={`Pay - ${cartFinal && cartFinal.totalPrice}`}
                ref={paymentBtn}
                className="paymentButton"/>
            </form>

        </div>
    </>
  )
}
