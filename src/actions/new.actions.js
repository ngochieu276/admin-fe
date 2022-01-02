import { newConstant } from "./constant";
import axios from "../helper/axios";
export const sendNew = (newLetter) => {
  return async (dispatch) => {
    try {
      dispatch({ type: newConstant.SEND_NEW_REQUEST });
      const res = await axios.post(`new/admin/create`, { ...newLetter });
      if (res.status === 201) {
        dispatch({
          type: newConstant.SEND_NEW_SUCCESS,
        });
        dispatch(getNews());
      }
    } catch (err) {
      const { error } = err.response;
      dispatch({
        type: newConstant.SEND_NEW_FAILURE,
        payload: { error },
      });
    }
  };
};

export const getNews = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: newConstant.GET_NEW_REQUEST });
      const res = await axios.get(`new/admin`);
      if (res.status === 200) {
        const { news } = res.data;
        dispatch({
          type: newConstant.GET_NEW_SUCCESS,
          payload: { news },
        });
      }
    } catch (err) {
      const { error } = err.response;
      dispatch({
        type: newConstant.GET_NEW_FAILURE,
        payload: { error },
      });
    }
  };
};
