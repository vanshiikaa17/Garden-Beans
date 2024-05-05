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
    RESET_PASSWORD_FAIL,
    ADMIN_USER_DETAILS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ADMIN_USER_DETAILS_SUCCESS,
    ADMIN_USER_DETAILS_FAIL,
    UPDATE_USER_DETAILS_REQUEST,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from "../constants/userConstants";
import { baseUrl } from '../env';
axios.defaults.withCredentials = true;
export const loginUser=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        const {data}=await axios.post(
            `${baseUrl}/api/users/login`,
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
            `${baseUrl}/api/users/mydetails`
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
            `${baseUrl}/api/users/newuser`,
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
        await axios.get(`${baseUrl}/api/users/logout`)
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
            `${baseUrl}/api/users/password/reset`,
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
            `${baseUrl}/api/users/password/reset/${token}`,
            passwords,
            requestHeaders
        );

        dispatch({type:RESET_PASSWORD_SUCCESS, payload:data.success});
    }catch(error){
        dispatch({type:RESET_PASSWORD_FAIL, payload:error.response.data.message});
    }
}
//admin
export const getAllUsers=()=>async(dispatch)=>{
    try{
        dispatch({type:ALL_USERS_REQUEST});

        const {data}=await axios.get(
            `${baseUrl}/api/users/admin/allusers`
        );

        dispatch({type:ALL_USERS_SUCCESS, payload:data.users});
    }catch(error){
        dispatch({type:ALL_USERS_FAIL, payload:error.response.data.message});
    }
}
//admin
export const getUserDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:ADMIN_USER_DETAILS_REQUEST});

        const {data}=await axios.get(
            `${baseUrl}/api/users/admin/userdetails/${id}`
        );

        dispatch({type:ADMIN_USER_DETAILS_SUCCESS, payload:data.user});
    }catch(error){
        dispatch({type:ADMIN_USER_DETAILS_FAIL, payload:error.response.data.message});
    }
}

//admin
export const updateUser=(id, userData)=>async(dispatch)=>{
    try{

        dispatch({type:UPDATE_USER_DETAILS_REQUEST});

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        const {data}=await axios.put(
            `${baseUrl}/api/users/admin/userdetails/${id}`,
            userData,
            requestHeaders
        );

        dispatch({type:UPDATE_USER_DETAILS_SUCCESS, payload:data.success});
    }catch(error){
        dispatch({type:UPDATE_USER_DETAILS_FAIL, payload:error.response.data.message});
    }
}

//admin
export const deleteUser=(id)=>async(dispatch)=>{
    try{

        dispatch({type:DELETE_USER_REQUEST});
        
        const {data}=await axios.delete(
            `${baseUrl}/api/users/admin/userdetails/${id}`,
            {
                withCredentials: true
              }
        );

        dispatch({type:DELETE_USER_SUCCESS, payload:data.success});
    }catch(error){
        dispatch({type:DELETE_USER_FAIL, payload:error.response.data.message});
    }
}

//clearing errors
export const clearErrors =()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERROR});
}