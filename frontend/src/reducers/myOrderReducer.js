import { createReducer } from "@reduxjs/toolkit"

const initialState={
    orders:[]
}
export const myOrdersReducer=createReducer(initialState,{
    MYORDERS_REQUEST:(state)=>{
        state.loading=true;
    },
    MYORDERS_SUCCESS:(state, action)=>{
        state.loading=false;
        state.orders=action.payload;
    },
    MYORDERS_FAIL:(state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    CLEAR_ERRORS:(state)=>{
    state.error = null;

    }
})