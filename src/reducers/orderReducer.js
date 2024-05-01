import { createReducer } from "@reduxjs/toolkit"

const initialState={
    order:{}
}
const initialOrders={
    orders:[]
}
export const orderReducer=createReducer(initialState,{
    CREATE_ORDER_REQUEST:(state)=>{
        state.loading=true;
    },
    CREATE_ORDER_SUCCESS:(state, action)=>{
        state.loading=false;
        state.order=action.payload;
    },
    CREATE_ORDER_FAIL:(state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    CLEAR_ERRORS:(state)=>{
    state.error = null;

    }
})

export const orderDetailsReducer=createReducer(initialState,{
    ORDER_DETAILS_REQUEST:(state)=>{
        state.loading=true;
    },
    ORDER_DETAILS_SUCCESS:(state, action)=>{
        state.loading=false;
        state.order=action.payload;
    },
    ORDER_DETAILS_FAIL:(state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    CLEAR_ERRORS:(state)=>{
    state.error = null;

    }
});

//all orders -ADMIN

export const allOrdersReducer=createReducer(initialOrders,{
    ORDERS_ADMIN_REQUEST:(state)=>{
        state.loading=true;
    },
    ORDERS_ADMIN_SUCCESS:(state, action)=>{
        state.loading=false;
        state.orders=action.payload;
    },
    ORDERS_ADMIN_FAIL:(state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    CLEAR_ERRORS:(state)=>{
        state.error = null;
    
        }
});

export const orderEditReducer = createReducer(initialState,{
    UPDATE_ORDER_ADMIN_REQUEST:(state)=>{
        state.loading=true;
    },
    UPDATE_ORDER_ADMIN_SUCCESS:(state, action)=>{
        state.loading=false;
        state.isUpdated=action.payload;
    },
    UPDATE_ORDER_ADMIN_FAIL:(state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    UPDATE_ORDER_ADMIN_RESET:(state)=>{
        state.isUpdated=false;
    },
    DELETE_ORDER_ADMIN_REQUEST:(state)=>{
        state.loading=true;
    },
    DELETE_ORDER_ADMIN_SUCCESS:(state, action)=>{
        state.loading=false;
        state.isDeleted=action.payload;
    },
    DELETE_ORDER_ADMIN_FAIL:(state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    DELETE_ORDER_ADMIN_RESET:(state)=>{
        state.isDeleted=false;
    },
    CLEAR_ERRORS:(state)=>{
        state.error = null;
    
        }
})