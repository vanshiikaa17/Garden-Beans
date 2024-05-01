import React from 'react'
import { Link } from 'react-router-dom'
import "./cart.css";

export const CartItemsCard = ({item, deleteFromCart}) => {
  return (
    <div className='cartItemsCard'>
        <img src={item.image} alt="product"/>
        <div>
            <Link to ={`/plants/${item.product}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={()=>{deleteFromCart(item.product)}}>Remove</p>
        </div>

    </div>
  )
}
