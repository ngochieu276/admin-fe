import { postConstant } from "../actions/constant";

const initialState = {
  posts: [],
  selectedPost: {},
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case postConstant.CREATE_POST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case postConstant.CREATE_POST_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case postConstant.CREATE_POST_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    case postConstant.GET_POST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case postConstant.GET_POST_SUCCESS:
      state = {
        ...state,
        posts: action.payload.posts,
        loading: false,
      };
      break;
    case postConstant.GET_POST_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    case postConstant.GET_POST_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case postConstant.GET_POST_BY_ID_SUCCESS:
      state = {
        ...state,
        selectedPost: action.payload.post,
        loading: false,
      };
      break;
    case postConstant.GET_POST_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }

  return state;
};
