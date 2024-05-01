import axios from 'axios';
import { CLEAR_ERROR, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from '../constants/userConstants';

export const updateDetails=(userData)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});

        const requestHeaders={headers:{"Content-Type":"multipart/form-data"}}

        const {data}=await axios.put(`/api/users/changemydetails`, userData, requestHeaders);

        dispatch({type:UPDATE_PROFILE_SUCCESS, payload:data.success});

    }catch(error){
        dispatch({type:UPDATE_PROFILE_FAIL, payload:error.response.data.message});
    }
}

export const updatePassword=(password)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST});

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        const {data}=await axios.put(`/api/users/changepassword`, password, requestHeaders);

        dispatch({type:UPDATE_PASSWORD_SUCCESS, payload:data.success});

    }catch(error){
        dispatch({type:UPDATE_PASSWORD_FAIL, payload:error.response.data.message});
    }
}

export const clearErrors =()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERROR});
}