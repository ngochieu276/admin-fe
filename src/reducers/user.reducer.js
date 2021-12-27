import { userConstant } from "../actions/constant";

const initialState = {
  users: [],
  selectedUser: null,
  meta: {},
  loading: true,
  loadingSpec: true,
  error: null,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstant.GET_USERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstant.GET_USERS_SUCCESS:
      state = {
        ...state,
        users: action.payload.users,
        meta: action.payload.meta,
        loading: false,
      };
      break;
    case userConstant.GET_USERS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case userConstant.GET_USERS_BY_ID_REQUEST:
      state = {
        ...state,
        loadingSpec: true,
      };
      break;
    case userConstant.GET_USERS_BY_ID_SUCCESS:
      state = {
        ...state,
        selectedUser: action.payload.user,
        loadingSpec: false,
      };
      break;
    case userConstant.GET_USERS_BY_ID_FAILURE:
      state = {
        ...state,
        loadingSpec: false,
        error: action.payload.error,
      };
      break;

    case userConstant.UPDATE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstant.UPDATE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstant.UPDATE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case userConstant.DELETE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstant.DELETE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstant.DELETE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
