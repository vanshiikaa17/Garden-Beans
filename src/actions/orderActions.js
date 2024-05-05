import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_ADMIN_REQUEST,
  DELETE_ORDER_ADMIN_SUCCESS,
  DELETE_ORDER_ADMIN_FAIL,
  MYORDERS_FAIL,
  MYORDERS_REQUEST,
  MYORDERS_SUCCESS,
  ORDERS_ADMIN_FAIL,
  ORDERS_ADMIN_REQUEST,
  ORDERS_ADMIN_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_ADMIN_FAIL,
  UPDATE_ORDER_ADMIN_REQUEST,
  UPDATE_ORDER_ADMIN_SUCCESS,
} from "../constants/orderConstants";
import { domainName } from "../env";
axios.defaults.withCredentials = true;
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MYORDERS_REQUEST });

    const { data } = await axios.get(`${domainName}/api/orders/myorders`);
    dispatch({ type: MYORDERS_SUCCESS, payload: data.myorders });
  } catch (error) {
    dispatch({ type: MYORDERS_FAIL, payload: error.response.data.message });
  }
};
export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`${domainName}/api/orders/orderinfo/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const requestHeaders = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${domainName}/api/orders/neworder`,
      order,
      requestHeaders
    );
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

//ADMIN- get all orders
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_ADMIN_REQUEST });

    const { data } = await axios.get(`${domainName}/api/orders/admin/allorders`);
    dispatch({ type: ORDERS_ADMIN_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: ORDERS_ADMIN_FAIL, payload: error.response.data.message });
  }
};

// ADMIN - update order
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_ADMIN_REQUEST });

    const requestHeaders = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${domainName}/api/orders/admin/order/${id} `,
      orderData,
      requestHeaders
    );
    dispatch({ type: UPDATE_ORDER_ADMIN_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ADMIN - delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_ADMIN_REQUEST });

    const { data } = await axios.delete(`${domainName}/api/orders/admin/order/${id} `);
    dispatch({ type: DELETE_ORDER_ADMIN_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
