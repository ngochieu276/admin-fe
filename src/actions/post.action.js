import { postConstant } from "./constant";
import axios from "../helper/axios";
export const createPost = (post) => {
  return async (dispatch) => {
    try {
      dispatch({ type: postConstant.CREATE_POST_REQUEST });
      const res = await axios.post(`post/admin/create`, { ...post });
      if (res.status === 201) {
        const { post } = res.data;
        dispatch({
          type: postConstant.CREATE_POST_SUCCESS,
          payload: { post },
        });
      } else {
        dispatch({
          type: postConstant.CREATE_POST_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPost = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: postConstant.GET_POST_REQUEST });
      const res = await axios.get(`post/admin`);
      if (res.status === 200) {
        const { posts } = res.data;
        dispatch({
          type: postConstant.GET_POST_SUCCESS,
          payload: { posts },
        });
      } else {
        dispatch({
          type: postConstant.GET_POST_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostById = (postId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: postConstant.GET_POST_BY_ID_REQUEST });
      const res = await axios.get(`post/admin/${postId}`);
      if (res.status === 200) {
        const { post } = res.data;
        dispatch({
          type: postConstant.GET_POST_BY_ID_SUCCESS,
          payload: { post },
        });
      } else {
        dispatch({
          type: postConstant.GET_POST_BY_ID_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePost = (payload) => {
  return async (dispatch) => {
    dispatch({ type: postConstant.UPDATE_POST_REQUEST });
    const res = await axios.put("/post/admin/update", { ...payload });

    if (res.status === 201) {
      dispatch({
        type: postConstant.UPDATE_POST_SUCCESS,
      });
      dispatch(getPost());
    } else {
      if (res.status === 400) {
        dispatch({
          type: postConstant.UPDATE_POST_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
