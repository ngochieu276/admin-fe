import axios from "../helper/axios";

import {
  userConstant,
  orderConstants,
  productConstants,
  postConstant,
} from "./constant";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.get("/initialData");

    if (res.status === 200) {
      const { users, products, orders, posts } = res.data;
      dispatch({
        type: userConstant.GET_USERS_SUCCESS,
        payload: { users },
      });
      dispatch({
        type: productConstants.GET_PRODUCT_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
      dispatch({
        type: postConstant.GET_POST_SUCCESS,
        payload: { posts },
      });
    }
  };
};
