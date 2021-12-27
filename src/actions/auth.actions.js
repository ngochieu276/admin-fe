import { authConstant } from "./constant";
import axios from "../helper/axios";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_REQUEST });
    try {
      const res = await axios.post("/admin/login", { ...user });
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(res.data);
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: { token, user },
        });
      }
    } catch (err) {
      const { error } = err.response.data;
      console.log(error);
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUT_REQUEST });
    const res = await axios.post("/admin/logout");
    console.log(res);

    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstant.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstant.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
