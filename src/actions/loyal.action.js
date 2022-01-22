import axios from "../helper/axios";
import { loyalClient } from "./constant";

export const getLoyalList = () => {
  return async (dispatch) => {
    dispatch({ type: loyalClient.GET_LOYAL_CLIENT_REQUEST });
    try {
      const res = await axios.get("loyal/admin/salesByUser");
      if (res.status === 200) {
        const { results } = res.data;
        dispatch({
          type: loyalClient.GET_LOYAL_CLIENT_SUCCESS,
          payload: { loyalList: results },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLoyalByCondition = (payload) => {
  return async (dispatch) => {
    dispatch({ type: loyalClient.GET_LOYAL_BY_CONDITION_REQUEST });
    try {
      const res = await axios.post("loyal/admin/getUsersByCondition", {
        ...payload,
      });
      if (res.status === 200) {
        const { results } = res.data;
        dispatch({
          type: loyalClient.GET_LOYAL_BY_CONDITION_SUCCESS,
          payload: { loyalList: results },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
