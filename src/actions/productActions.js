import axios from 'axios';

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERROR,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL
} from "../constants/productConstants";
import { baseUrl } from '../env';
axios.defaults.withCredentials = true;
export const getProducts=(keyword="", currentPage=1, price=[0,2500], category, ratings=0)=>async(dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});

        let link=`${baseUrl}/api/products/allproducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category){
            link=`${baseUrl}/api/products/allproducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data}=await axios.get(link);
        
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        });
    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
}
export const getProductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data}=await axios.get(`${baseUrl}/api/products/allproducts/${id}`);

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        });
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        });
    }
}

// ADMIN-- get all products
export const getProductsAdmin=()=>async(dispatch)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_REQUEST});

        const {data} = await axios.get(`${baseUrl}/api/products/admin/allproducts`);

        dispatch({type:ADMIN_PRODUCT_SUCCESS, payload:data.allProducts});

    }catch(error){
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
}

//reviews
export const addReview=(review)=>async(dispatch)=>{
    try{

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        dispatch({type:NEW_REVIEW_REQUEST});
        const {data}=await axios.put(`${baseUrl}/api/products/review`, review, requestHeaders);

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success
        });
    }catch(error){
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        });
    }
}

//new product
export const addProduct=(product)=>async(dispatch)=>{
    try{

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        dispatch({type:NEW_PRODUCT_REQUEST});
        const {data}=await axios.post(`${baseUrl}/api/products/admin/allproducts/new`, product, requestHeaders);

        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data
        });
    }catch(error){
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
}

//update product
export const updateProduct=(id, product)=>async(dispatch)=>{
    try{

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        dispatch({type:UPDATE_PRODUCT_REQUEST});
        const {data}=await axios.put(`${baseUrl}/api/products/admin/allproducts/${id}`, product, requestHeaders);

        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data
        });
    }catch(error){
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
}

//delete product
export const deleteProduct=(id)=>async(dispatch)=>{
    try{

        const requestHeaders={headers:{"Content-Type":"application/json"}}

        dispatch({type:DELETE_PRODUCT_REQUEST});
        const {data}=await axios.delete(`${baseUrl}/api/products/admin/allproducts/${id}`, id, requestHeaders);

        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data
        });
    }catch(error){
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
}
//clearing errors
export const clearErrors =()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERROR});
}