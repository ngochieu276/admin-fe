import { loyalClient } from "../actions/constant";

const initialState = {
  loyalList: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case loyalClient.GET_LOYAL_CLIENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case loyalClient.GET_LOYAL_CLIENT_SUCCESS:
      state = {
        ...state,
        loyalList: action.payload.loyalList,
        loading: false,
      };
      break;
    case loyalClient.GET_LOYAL_CLIENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    //

    case loyalClient.GET_LOYAL_BY_CONDITION_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case loyalClient.GET_LOYAL_BY_CONDITION_SUCCESS:
      state = {
        ...state,
        loyalList: action.payload.loyalList,
        loading: false,
      };
      break;
    case loyalClient.GET_LOYAL_BY_CONDITION_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }

  return state;
};
