import { productConstants } from "./constant";
import axios from "../helper/axios";

export const getProducts = (query) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_REQUEST });
    const res = await axios.post("/product/getProductsByQuery", { query });

    if (res.status === 200) {
      const { products, meta } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_SUCCESS,
        payload: { products, meta },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: productConstants.GET_PRODUCT_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
      const res = await axios.post(`product/create`, { ...product });
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
        dispatch(getProducts(""));
      } else {
        dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductById = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_BY_ID_REQUEST });
      const res = await axios.get(`product/${productId}`);
      if (res.status === 200) {
        const { product } = res.data;

        dispatch({
          type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
          payload: { product },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_BY_ID_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProduct = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });
    const res = await axios.put("/product/update", { ...payload });

    if (res.status === 201) {
      dispatch({
        type: productConstants.UPDATE_PRODUCT_SUCCESS,
      });
      dispatch(getProducts(""));
    } else {
      if (res.status === 400) {
        dispatch({
          type: productConstants.UPDATE_PRODUCT_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
