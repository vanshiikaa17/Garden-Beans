import { createReducer } from "@reduxjs/toolkit";

const initialState={
    user:{},
};

export const updateProfileReducer=createReducer(initialState, {
    UPDATE_PROFILE_REQUEST:(state)=>{
        state.loading=true;
    },
    UPDATE_PROFILE_SUCCESS:(state, action)=>{
        state.loading=false;
        state.isUpdated=action.payload;
    },
    UPDATE_PROFILE_FAIL:(state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    UPDATE_PROFILE_RESET:(state)=>{
        state.isUpdated=false;
    },
    UPDATE_PASSWORD_REQUEST:(state)=>{
        state.loading=true;
    },
    UPDATE_PASSWORD_SUCCESS:(state, action)=>{
        state.loading=false;
        state.isUpdated=action.payload;
    },
    UPDATE_PASSWORD_FAIL:(state, action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    UPDATE_PASSWORD_RESET:(state)=>{
        state.isUpdated=false;
    },
    CLEAR_ERROR: (state) => {
        state.error = null;
      },
})