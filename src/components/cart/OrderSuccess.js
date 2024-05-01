import React from 'react'
import {GiFlowerPot} from "react-icons/gi";
import { Link } from 'react-router-dom';
import "./orderSuccess.css"
export const OrderSuccess = () => {
  return (
    <div className='ordersuccess'>
        <GiFlowerPot/>
        <h2>Beans are on their way!</h2>
        <Link to="/orders">View All Orders</Link>
    </div>
  )
}
