import { userConstant } from "./constant";
import axios from "../helper/axios";

export const getUsers = (query) => {
  return async (dispatch) => {
    dispatch({ type: userConstant.GET_USERS_REQUEST });
    const res = await axios.post("/getUsersByQuery", { query });

    if (res.status === 200) {
      const { users, meta } = res.data;
      dispatch({
        type: userConstant.GET_USERS_SUCCESS,
        payload: { users, meta },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstant.GET_USERS_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const getUserById = (userId) => {
  return async (dispatch) => {
    dispatch({ type: userConstant.GET_USERS_BY_ID_REQUEST });
    const res = await axios.get(`/adminUser/${userId}`);

    if (res.status === 200) {
      const { user } = res.data;
      dispatch({
        type: userConstant.GET_USERS_BY_ID_SUCCESS,
        payload: { user },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstant.GET_USERS_BY_ID_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const createAdminUser = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: userConstant.ADD_USER_REQUEST });
    const res = await axios.post("/adminUser/create", { ...user });

    if (res.status === 201) {
      const { user } = res.data;
      dispatch({
        type: userConstant.ADD_USER_SUCCESS,
        payload: { user },
      });
      dispatch(getUsers(""));
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstant.ADD_USER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const updateAdminUser = (payload) => {
  return async (dispatch) => {
    dispatch({ type: userConstant.UPDATE_USER_REQUEST });
    const res = await axios.put("/adminUser/update", { ...payload });

    if (res.status === 201) {
      dispatch({
        type: userConstant.UPDATE_USER_SUCCESS,
      });
      dispatch(getUsers(""));
    } else {
      if (res.status === 400) {
        console.log(res.data);
        dispatch({
          type: userConstant.UPDATE_USER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: userConstant.DELETE_USER_REQUEST });
    const res = await axios.delete(`/adminUser/${userId}`);

    if (res.status === 202) {
      dispatch({
        type: userConstant.DELETE_USER_SUCCESS,
      });
      dispatch(getUsers(""));
    } else {
      if (res.status === 400) {
        console.log(res.data);
        dispatch({
          type: userConstant.DELETE_USER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
