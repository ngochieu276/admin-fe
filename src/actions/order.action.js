import axios from "../helper/axios";
import { orderConstants } from "./constant";
import { getReports } from "./report.action";

export const getCustomerOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.get("order/admin/getCustomerOrders");
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOrdersByEmail = (payload) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_BYEMAIL_REQUEST });
    try {
      const res = await axios.post("order/admin/getOrdersByEmail", {
        ...payload,
      });
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_BYEMAIL_SUCCESS,
          payload: { orders },
        });
      }
    } catch (err) {
      console.log(err.response);
      // const { error } = err.response.data;
      // dispatch({
      //   type: orderConstants.GET_CUSTOMER_ORDER_BYEMAIL_FAILURE,
      //   payload: { error },
      // });
    }
  };
};

export const getOrderById = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOM_ORDER_BY_ID_REQUEST });
    try {
      const res = await axios.get(`order/admin/${orderId}`);
      if (res.status === 200) {
        const { order } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOM_ORDER_BY_ID_SUCCESS,
          payload: { order },
        });
        return order;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOM_ORDER_BY_ID_FAILURE,
          payload: { error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.post("order/admin/update", payload);

      if (res.status === 201) {
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS,
        });
        dispatch(getCustomerOrders());
        dispatch(getReports());
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS,
          payload: { error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOrderBy = (orderBy) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.SORT_ORDER_REQUEST });
    try {
      const res = await axios.get(`order/admin/sort/${orderBy}`);

      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: orderConstants.SORT_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.SORT_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
