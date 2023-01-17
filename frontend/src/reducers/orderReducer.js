import { createReducer } from "@reduxjs/toolkit"

const initialState={
    order:{}
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
})