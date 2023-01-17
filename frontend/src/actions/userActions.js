import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERROR,
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} from "../constants/userConstants";

export const loginUser=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        const {data}=await axios.post(
            `/api/users/login`,
            {email,password},
            requestHeaders
        );

        dispatch({type:LOGIN_SUCCESS, payload:data.user});
    }catch(error){
        dispatch({type:LOGIN_FAIL, payload:error.response.data.message});
    }
}
export const loadUserDetails=()=>async(dispatch)=>{
    try{
        dispatch({type:USER_DETAILS_REQUEST});

        const {data}=await axios.get(
            `/api/users/mydetails`
        );

        dispatch({type:USER_DETAILS_SUCCESS, payload:data.user});
    }catch(error){
        dispatch({type:USER_DETAILS_FAIL, payload:error.response.data.message});
    }
}

export const signupUser=(userInfo)=>async(dispatch)=>{
    try{
        dispatch({type:SIGNUP_USER_REQUEST});

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        const {data}=await axios.post(
            `/api/users/newuser`,
            userInfo,
            requestHeaders
        );

        dispatch({type:SIGNUP_USER_SUCCESS, payload:data.user});
    }catch(error){
        dispatch({type:SIGNUP_USER_FAIL, payload:error.response.data.message});
    }
}

export const logout=()=>async(dispatch)=>{
    try{
        await axios.get(`api/users/logout`)
        dispatch({type:LOGOUT_SUCCESS});
    }catch(error){
        dispatch({type:LOGOUT_FAIL, payload:error.response.data.message});
        
    }
}

export const forgotPassword=(email)=>async(dispatch)=>{
    try{

        dispatch({type:FORGOT_PASSWORD_REQUEST});

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        const {data}=await axios.post(
            `/api/users/password/reset`,
            email,
            requestHeaders
        );

        dispatch({type:FORGOT_PASSWORD_SUCCESS, payload:data.message});
    }catch(error){
        dispatch({type:FORGOT_PASSWORD_FAIL, payload:error.response.data.message});
    }
}

export const resetPassword=(token, passwords)=>async(dispatch)=>{
    try{

        dispatch({type:RESET_PASSWORD_REQUEST});

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        const {data}=await axios.put(
            `/api/users/password/reset/${token}`,
            passwords,
            requestHeaders
        );

        dispatch({type:RESET_PASSWORD_SUCCESS, payload:data.success});
    }catch(error){
        dispatch({type:RESET_PASSWORD_FAIL, payload:error.response.data.message});
    }
}
//clearing errors
export const clearErrors =()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERROR});
}