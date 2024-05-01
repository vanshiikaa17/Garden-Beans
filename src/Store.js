import {configureStore} from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer } from "./reducers/myOrderReducer";
import { allOrdersReducer, orderDetailsReducer, orderEditReducer, orderReducer } from "./reducers/orderReducer";
import {productReducer,productDetailsReducer, reviewReducer, newProductReducer, deleteProductReducer} from "./reducers/productReducer";
import {updateProfileReducer} from "./reducers/updateProfileReducer";
import {adminUsersReducer, forgotPasswordReducer, resetPasswordReducer, userDetailsReducer, userReducer} from "./reducers/userReducer";


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
        newReview:reviewReducer,
        newProduct:newProductReducer,
        deleteProduct:deleteProductReducer,
        allOrders:allOrdersReducer,
        editOrder:orderEditReducer,
        allUsers:adminUsersReducer,
        userDetails:userDetailsReducer
    },
    preloadedState: initialState
});

export default store;