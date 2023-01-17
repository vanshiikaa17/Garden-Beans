import { createReducer } from "@reduxjs/toolkit";

const initialState={
    cartItems:[],
    shippingInfo:{}
}
export const cartReducer=createReducer(initialState,{
    ADD_TO_CART:(state, action)=>{
        const item=action.payload;

        const itemExists = state.cartItems.find(
            (i)=>i.product === item.product
        )

        if(itemExists){
            state.cartItems=state.cartItems.map((i)=>
            i.product === itemExists.product ? item : i)
        }else{
            state.cartItems = [...state.cartItems, item]
        }
    },
    REMOVE_FROM_CART:(state, action)=>{
        state.cartItems=state.cartItems.filter((i)=> i.product !== action.payload);
    },
    SHIPPING_INFO:(state, action)=>{
        state.shippingInfo = action.payload;
    }
})