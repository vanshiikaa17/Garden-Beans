import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MYORDERS_FAIL,
  MYORDERS_REQUEST,
  MYORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MYORDERS_REQUEST });

    const { data } = await axios.get("/api/orders/myorders");
    dispatch({ type: MYORDERS_SUCCESS, payload: data.myorders });
  } catch (error) {
    dispatch({ type: MYORDERS_FAIL, payload: error.response.data.message });
  }
};
export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/orders/orderinfo/${id}`);
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
      "/api/orders/neworder",
      order,
      requestHeaders
    );
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
