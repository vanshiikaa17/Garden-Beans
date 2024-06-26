import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART, SHIPPING_INFO } from "../constants/cartConstants";
import { baseUrl } from "../env";
axios.defaults.withCredentials = true;
export const addToCart=(id , quantity) => async(dispatch, getState)=>{
    const {data}=await axios.get(`${baseUrl}/api/products/allproducts/${id}`);

    dispatch({type:ADD_TO_CART, 
    payload:{
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images.url,
        stock:data.product.stock,
        quantity
    }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart=(id ) => async(dispatch, getState)=>{

    dispatch({type:REMOVE_FROM_CART, 
    payload: id
       
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo=(data)=>async(dispatch)=>{
    dispatch({type:SHIPPING_INFO,
        payload:data
    });

    localStorage.setItem("Shipping Info", JSON.stringify(data));

}