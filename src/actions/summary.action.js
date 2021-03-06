import axios from "../helper/axios";
import { summaryConstant } from "./constant";

export const getTopSales = (payload) => {
  return async (dispatch) => {
    dispatch({ type: summaryConstant.GET_TOP_SALES_REQUEST });
    try {
      const res = await axios.post("summary/getBestSalesProduct", {
        ...payload,
      });
      if (res.status === 200) {
        const { results } = res.data;

        dispatch({
          type: summaryConstant.GET_TOP_SALES_SUCCESS,
          payload: { topSales: results },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getSalesByDay = (payload) => {
  return async (dispatch) => {
    dispatch({ type: summaryConstant.GET_SALES_BY_DAY_REQUEST });
    try {
      const res = await axios.post("summary/getSalesByDay", { ...payload });
      if (res.status === 200) {
        const { results } = res.data;

        dispatch({
          type: summaryConstant.GET_SALES_BY_DAY_SUCCESS,
          payload: { salesByDay: results },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const getSalesByMonth = (payload) => {
  return async (dispatch) => {
    dispatch({ type: summaryConstant.GET_SALES_BY_MONTH_REQUEST });
    try {
      const res = await axios.get("summary/getSalesByMonth");
      if (res.status === 200) {
        const { results } = res.data;

        dispatch({
          type: summaryConstant.GET_SALES_BY_MONTH_SUCCESS,
          payload: { salesByMonth: results },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPopTags = (payload) => {
  return async (dispatch) => {
    dispatch({ type: summaryConstant.GET_POP_TAGS_REQUEST });
    try {
      const res = await axios.post("summary/getPopulateTags", { ...payload });
      if (res.status === 200) {
        const { results } = res.data;
        dispatch({
          type: summaryConstant.GET_POP_TAGS_SUCCESS,
          payload: { popTags: results },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUserBuyList = () => {
  return async (dispatch) => {
    dispatch({ type: summaryConstant.GET_USER_BUY_REQUEST });
    try {
      const res = await axios.get("loyal/admin/salesByUser");
      if (res.status === 200) {
        const { results } = res.data;

        dispatch({
          type: summaryConstant.GET_USER_BUY_SUCCESS,
          payload: { usersBuyList: results },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRebuyPercent = (payload) => {
  return async (dispatch) => {
    dispatch({ type: summaryConstant.GET_REBUY_REQUEST });
    try {
      const res = await axios.post("summary/getRebuyPercent", payload);
      if (res.status === 200) {
        const { results } = res.data;
        const rebuyList = results[0].data;
        dispatch({
          type: summaryConstant.GET_REBUY_SUCCESS,
          payload: { rebuyList: rebuyList },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
