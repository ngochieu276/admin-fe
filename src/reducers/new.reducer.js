import { newConstant } from "../actions/constant";

const initialState = {
  news: [],
  selectedNew: {},
  loadingSpec: true,
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case newConstant.SEND_NEW_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case newConstant.SEND_NEW_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case newConstant.SEND_NEW_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    case newConstant.GET_NEW_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case newConstant.GET_NEW_SUCCESS:
      state = {
        ...state,
        news: action.payload.news,
        loading: false,
      };
      break;
    case newConstant.GET_NEW_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }

  return state;
};
