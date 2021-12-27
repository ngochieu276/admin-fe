import { postConstant } from "../actions/constant";

const initialState = {
  posts: [],
  selectedPost: {},
  loadingSpec: true,
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
        loadingSpec: true,
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
        loadingSpec: true,
      };
      break;
    case postConstant.GET_POST_BY_ID_SUCCESS:
      state = {
        ...state,
        selectedPost: action.payload.post,
        loadingSpec: false,
      };
      break;
    case postConstant.GET_POST_BY_ID_FAILURE:
      state = {
        ...state,
        loadingSpec: false,
      };
      break;
  }

  return state;
};
