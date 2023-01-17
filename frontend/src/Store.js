import {configureStore} from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer } from "./reducers/myOrderReducer";
import { orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import {productReducer,productDetailsReducer, reviewReducer} from "./reducers/productReducer";
import {updateProfileReducer} from "./reducers/updateProfileReducer";
import {forgotPasswordReducer, resetPasswordReducer, userReducer} from "./reducers/userReducer";


const initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("Shipping Info")?JSON.parse(localStorage.getItem("Shipping Info")):{},
    },
}
const store=configureStore({
    reducer:{
        product:productReducer,
        productDetails:productDetailsReducer,
        user:userReducer,
        updateProfile:updateProfileReducer,
        forgotPassword:forgotPasswordReducer,
        resetPassword:resetPasswordReducer,
        cart:cartReducer,
        order:orderReducer,
        myOrders:myOrdersReducer,
        orderDetails:orderDetailsReducer,
        newReview:reviewReducer  
    },
    preloadedState: initialState
});

export default store;