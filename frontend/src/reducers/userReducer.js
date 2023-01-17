import { createReducer } from "@reduxjs/toolkit";

const initialUserState = {
  user: {},
};

export const userReducer = createReducer(initialUserState, {
  SIGNUP_USER_REQUEST: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },

  SIGNUP_USER_SUCCESS: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  SIGNUP_USER_FAIL: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.error = action.payload;
  },

  USER_DETAILS_REQUEST: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  USER_DETAILS_SUCCESS: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  USER_DETAILS_FAIL: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.error = action.payload;
  },

  LOGIN_REQUEST: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },

  LOGIN_SUCCESS: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },

  LOGIN_FAIL: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.error = action.payload;
  },

  LOGOUT_SUCCESS:(state)=>{
    state.loading=false;
    state.isAuthenticated=false;
    state.user=null;
  },
  LOGOUT_FAIL:(state, action)=>{
    state.loading=false;
    state.error=action.payload;
  },
  CLEAR_ERROR: (state) => {
    state.error = null;
  },
});

export const forgotPasswordReducer = createReducer(initialUserState, {
  FORGOT_PASSWORD_REQUEST:(state)=>{
    state.loading=true;
    state.error=null;
  },
  FORGOT_PASSWORD_SUCCESS:(state, action)=>{
    state.loading=false;
    state.message=action.payload;
  },
  FORGOT_PASSWORD_FAIL:(state, action)=>{
    state.loading=false;
    state.error=action.payload;
  },
 
  CLEAR_ERROR: (state) => {
    state.error = null;
  },
})

export const resetPasswordReducer = createReducer(initialUserState, {
  RESET_PASSWORD_REQUEST:(state)=>{
    state.loading=true;
    state.error=null;
  },
  RESET_PASSWORD_SUCCESS:(state, action)=>{
    state.loading=false;
    state.success=action.payload;
  },
  RESET_PASSWORD_FAIL:(state, action)=>{
    state.loading=false;
    state.error=action.payload;
  },
  CLEAR_ERROR: (state) => {
    state.error = null;
  },
})

