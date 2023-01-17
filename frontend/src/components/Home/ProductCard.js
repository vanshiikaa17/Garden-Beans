import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";


export const ProductCard = (props) => {
  const {product}=props;

  const options={
    edit:false,
    activeColor:"green",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf:true
}
  return (
    <Link className='productCard' to={`/allproducts/${product._id}`}>
        <img className='cardimg' src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <span className='spann'>{`₹${product.price}`}</span>

        <div className='reviews'>
            <ReactStars {...options}/> <span>({product.numberOfReviews} Reviews)</span>
        </div>
    
    </Link>
  )
}
