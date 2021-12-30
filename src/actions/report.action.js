import { reportConstant } from "./constant";
import axios from "../helper/axios";

export const getReports = () => {
  return async (dispatch) => {
    dispatch({ type: reportConstant.GET_REPORT_REQUEST });
    try {
      const res = await axios.get("/report/admin");
      if (res.status === 200) {
        console.log(res.data);
        const { reports } = res.data;
        dispatch({
          type: reportConstant.GET_REPORT_SUCCESS,
          payload: { reports },
        });
      }
    } catch (err) {
      const error = err.response.data;
      dispatch({
        type: reportConstant.GET_REPORT_FAILURE,
        payload: { error },
      });
    }
  };
};

export const getAdvangeSearchReports = (payload) => {
  return async (dispatch) => {
    dispatch({ type: reportConstant.GET_ADVANGE_REPORTS_REQUEST });
    try {
      const res = await axios.post("/report/admin/advangeSearchReports", {
        ...payload,
      });
      if (res.status === 200) {
        console.log(res);
        const { reports } = res.data;
        dispatch({
          type: reportConstant.GET_ADVANGE_REPORTS_SUCCESS,
          payload: { reports },
        });
      }
    } catch (err) {
      const error = err.response.data;
      dispatch({
        type: reportConstant.GET_ADVANGE_REPORTS_FAILURE,
        payload: { error },
      });
    }
  };
};

export const updateReportsToChecked = () => {
  return async (dispatch) => {
    dispatch({ type: reportConstant.UPDATE_CHECK_REPORT_REQUEST });
    try {
      const res = await axios.get("/report/admin/updateReportsToChecked");
      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: reportConstant.UPDATE_CHECK_REPORT_SUCCESS,
        });
      }
    } catch (err) {
      console.log(err);
      // const error = err.response.data;
      // dispatch({
      //   type: reportConstant.UPDATE_CHECK_REPORT_FAILURE,
      //   payload: { error },
      // });
    }
  };
};
