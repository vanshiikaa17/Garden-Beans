import { createReducer } from "@reduxjs/toolkit";
// import {
//     ALL_PRODUCT_FAIL,
//     ALL_PRODUCT_REQUEST,
//     ALL_PRODUCT_SUCCESS
// } from "../constants/productConstants";
const initialState = {
    products: []
}
const initialStateProductDetails = {
    product: {}
}
const initialReviewState={
    review:{}
}
const initialNewProduct={
    product:{}
}
export const productReducer = createReducer(
    initialState
    ,{
        ALL_PRODUCT_REQUEST: (state) => {
            state.loading = true;
            state.products = [];
        },
        ADMIN_PRODUCT_REQUEST: (state) => {
            state.loading = true;
            state.products = [];
        },
        ALL_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.products = action.payload.allProducts;
            state.productsCount = action.payload.productsCount;
            state.productsPerPage = action.payload.productsPerPage;
            state.filteredCount= action.payload.filteredCount;
        },
        ALL_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        ADMIN_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        ADMIN_PRODUCT_SUCCESS: (state, action)=>{
            state.loading = false;
            state.products=action.payload;
        },

        CLEAR_ERROR: (state) => {

            state.error = null;
        },
    },
);

export const productDetailsReducer = createReducer(
    initialStateProductDetails
    ,{
        PRODUCT_DETAILS_REQUEST: (state) => {
            state.loading = true;
            
        },
        PRODUCT_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        PRODUCT_DETAILS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        CLEAR_ERROR: (state) => {

            state.error = null;
        },
    },
);

export const reviewReducer = createReducer(
    initialReviewState
    ,{
        NEW_REVIEW_REQUEST: (state) => {
            state.loading = true;
            
        },
        NEW_REVIEW_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        NEW_REVIEW_RESET: (state) => {
            state.success = false;
        },
        NEW_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        CLEAR_ERROR: (state) => {

            state.error = null;
        },
    },
);

export const newProductReducer = createReducer(
    initialNewProduct
    ,{
        NEW_PRODUCT_REQUEST: (state) => {
            state.loading = true;
            
        },
        NEW_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.product = action.payload.product;
        },
        NEW_PRODUCT_RESET: (state) => {
            state.success = false;
        },
        NEW_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_PRODUCT_REQUEST: (state) => {
            state.loading = true;
            
        },
        UPDATE_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
        },
        UPDATE_PRODUCT_RESET: (state) => {
            state.success = false;
        },
        UPDATE_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state) => {

            state.error = null;
        },
    },
);

export const deleteProductReducer = createReducer(
    initialNewProduct
    ,{
        DELETE_PRODUCT_REQUEST: (state) => {
            state.loading = true;
            
        },
        DELETE_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        },
        DELETE_PRODUCT_RESET: (state) => {
            state.success = false;
        },
        DELETE_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        CLEAR_ERROR: (state) => {

            state.error = null;
        },
    },
);

