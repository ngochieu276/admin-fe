import { userConstant } from "../actions/constant";

const initialState = {
  users: [],
  meta: {},
  loading: false,
  creating: false,
  error: null,
  message: "",
};

export default (state = initialState, action) => {
  console.log(action);
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
  }
  return state;
};
